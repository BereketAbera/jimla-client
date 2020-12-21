import { AdminService } from '@app/_services/admin/admin.service';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.scss']
})
export class OrderDetailModalComponent implements OnInit {
  @Input('data') data;
  orders = [];
  retailer: any;
  merchant: any;
  processTypes = [
    { name: 'AVAILABLE', id: 'AVAILABLE' },
    { name: 'NOT_AVAILABLE', id: 'NOT_AVAILABLE' }
  ];
  @ViewChild('successMessage', { static: false }) template?: TemplateRef<{}>;

  constructor(private modal: NzModalRef, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getOrderGroupOrders(this.data.id).subscribe((res) => {
      this.orders = res.orders.orders;
      this.retailer = res.orders.address;
      this.merchant = this.orders.length ? (this.merchant = this.orders[0].merchant) : {};
    });
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }
}
