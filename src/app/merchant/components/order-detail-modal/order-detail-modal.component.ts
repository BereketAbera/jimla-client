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
  retailer: any;
  processTypes = [
    { name: 'AVAILABLE', id: 'AVAILABLE' },
    { name: 'NOT_AVAILABLE', id: 'NOT_AVAILABLE' }
  ];
  @ViewChild('successMessage', { static: false }) template?: TemplateRef<{}>;

  constructor(
    private modal: NzModalRef,
    private orderService: OrderService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.orderService.getOrderGroupOrders(this.data.id).subscribe((res) => {
      this.orders = res.orders;
      this.retailer = this.orders.length ? (this.retailer = this.orders[0].retailer) : {};
    });
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }

  statusChanged(event, order) {
    this.orderService.updateOrderStatus(order.id, { status: event }).subscribe((res) => {
      if (res.order) {
        this.notificationService.template(this.template, {});
      }
    });
  }
}
