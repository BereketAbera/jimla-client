import { AdminService } from '@app/_services/admin/admin.service';
import { Component, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderDetailModalComponent } from '../order-detail-modal/order-detail-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders = [];
  count = 0;
  page = 0;
  pageSize = 0;
  firstReload = true;
  detailClose: EventEmitter<any> = new EventEmitter();
  @ViewChild('successMessage', { static: false }) template?: TemplateRef<{}>;

  //filter values
  filterActive = false;
  date;
  startDate;
  endDate;
  phoneNumber = '';
  type = '';
  status = '';
  code = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private modal: NzModalService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res: { data: any }) => {
      this.orders = res.data.rows;
      this.count = res.data.count;
    });
    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      this.code = res['code'] || '';
      this.type = res['type'] || '';
      this.status = res['status'] || '';
      this.phoneNumber = res['phoneNumber'] || '';
      this.startDate = res['startDate'] || '';
      this.endDate = res['endDate'] || '';

      if (!this.firstReload) {
        this.getOrderGroups();
      } else {
        this.firstReload = false;
      }
    });

    this.detailClose.subscribe((res) => {});
  }

  getOrderGroups() {
    this.adminService
      .getOrders({
        page: this.page,
        pageSize: this.pageSize,
        phoneNumber: this.phoneNumber,
        type: this.type,
        status: this.status,
        code: this.code,
        startDate: this.startDate,
        endDate: this.endDate
      })
      .subscribe((res: { orders: any }) => {
        this.orders = res.orders.rows;
        this.count = res.orders.count;
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

  clearFilter() {
    this.setUrlValues({
      phoneNumber: '',
      type: '',
      status: '',
      code: '',
      startDate: '',
      endDate: ''
    });
    this.filter();
  }

  applyFilter() {
    this.setUrlValues({
      phoneNumber: this.phoneNumber,
      type: this.type,
      status: this.status,
      code: this.code,
      startDate: this.startDate,
      endDate: this.endDate
    });
    this.filter();
  }

  filter() {
    this.filterActive = !this.filterActive;
  }

  onDateChange(event: Array<Date>) {
    this.startDate = event[0].toISOString().split('T')[0];
    this.endDate = event[1].toISOString().split('T')[0];
  }

  process(order_group) {
    this.router.navigate([`/merchant/pending_orders/create_order_voice/${order_group.id}`]);
  }

  showDetail(event) {
    this.modal.create({
      nzComponentParams: { data: event },
      nzTitle: 'Order Detail',
      nzContent: OrderDetailModalComponent,
      nzAfterClose: this.detailClose
    });
  }
}
