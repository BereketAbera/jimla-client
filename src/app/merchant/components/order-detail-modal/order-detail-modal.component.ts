import { OrderService } from './../../../_services/order/order.service';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.scss']
})
export class OrderDetailModalComponent implements OnInit {
  @Input('data') data;
  orders = [];
  retailer: any;

  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private orderService: OrderService
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
}
