import { OrderService } from './../../../_services/order/order.service';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.scss']
})
export class OrderDetailModalComponent implements OnInit {
  @Input('data') data;
  orders = [];
  merchant: any;

  constructor(
    private modal: NzModalRef,
    private orderService: OrderService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrderGroupOrders(this.data.id).subscribe((res) => {
      this.orders = res.orders.orders;
      this.merchant = this.orders.length ? (this.merchant = this.orders[0].merchant) : {};
    });
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }
}
