import { AuthenticationService } from '@app/_services/authentication.service';
import { Component, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OrderService } from '@app/_services/order/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderDetailModalComponent } from '../order-detail-modal/order-detail-modal.component';

@Component({
  selector: 'app-active-order-list',
  templateUrl: './active-order-list.component.html',
  styleUrls: ['./active-order-list.component.scss']
})
export class ActiveOrderListComponent implements OnInit {
  order_groups = [];
  count = 0;
  page = 0;
  pageSize = 0;
  firstReload = true;
  detailClose: EventEmitter<any> = new EventEmitter();
  @ViewChild('successMessage', { static: false }) template?: TemplateRef<{}>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private modal: NzModalService,
    private notificationService: NzNotificationService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res: { data: any }) => {
      this.order_groups = res.data.rows;
      this.count = res.data.count;
    });
    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      if (!this.firstReload) {
        this.getOrderGroups();
      } else {
        this.firstReload = false;
      }
    });
    let newUser = {
      ...this.authenticationService.userValue,
      prevLoggedIn: new Date()
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    this.authenticationService.setUserValue(newUser);

    this.detailClose.subscribe((res) => {});
  }

  getOrderGroups() {
    this.orderService
      .getMerchantOrderGroups({ page: this.page, pageSize: this.pageSize, type: 'ACTIVE' })
      .subscribe((res: { order_groups: any }) => {
        this.order_groups = res.order_groups.rows;
        this.count = res.order_groups.count;
      });
  }

  pageChanged(event) {
    this.setUrlValues({ page: event - 1 });
  }

  pageSizeChanged(event) {
    setTimeout(() => {
      this.setUrlValues({ pageSize: event });
    }, 1);
  }

  setUrlValues(sObj) {
    let keys = Object.keys(sObj);
    let pObj = {};
    keys.map((key) => {
      pObj[key] = sObj[key];
    });
    const queryParams: Params = {
      ...pObj
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

  process(order_group) {
    this.router.navigate([`/merchant/pending_orders/create_order_voice/${order_group.id}`]);
  }

  showDetail(event) {
    this.modal.create({
      nzComponentParams: { data: event },
      nzTitle: 'Order Group Detail',
      nzContent: OrderDetailModalComponent,
      nzAfterClose: this.detailClose
    });
  }

  changeStatus(event, status) {
    this.orderService.updateOrderGroupStatus(event.id, { status }).subscribe((res) => {
      if (res.orderGroup) {
        this.notificationService.template(this.template, {});
        this.getOrderGroups();
      }
    });
  }
}
