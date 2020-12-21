import { Component, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OrderService } from '@app/_services/order/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { OrderDetailModalComponent } from '../order-detail-modal/order-detail-modal.component';

@Component({
  selector: 'app-active-orders',
  templateUrl: './active-orders.component.html',
  styleUrls: ['./active-orders.component.scss']
})
export class ActiveOrdersComponent implements OnInit {
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
    private modal: NzModalService
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
        this.getOrders();
      } else {
        this.firstReload = false;
      }
    });
  }

  getOrders() {
    this.orderService
      .getRetailerOrderGroups({ page: this.page, pageSize: this.pageSize })
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

  showDetail(event) {
    this.modal.create({
      nzComponentParams: { data: event },
      nzTitle: 'Order Group Detail',
      nzContent: OrderDetailModalComponent,
      nzAfterClose: this.detailClose
    });
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
}
