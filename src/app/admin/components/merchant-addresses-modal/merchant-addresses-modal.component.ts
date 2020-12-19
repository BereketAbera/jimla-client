import { AdminService } from '@app/_services/admin/admin.service';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-merchant-addresses-modal',
  templateUrl: './merchant-addresses-modal.component.html',
  styleUrls: ['./merchant-addresses-modal.component.scss']
})
export class MerchantAddressesModalComponent implements OnInit {
  @Input('data') data;
  orders = [];
  addresses = [];
  retailer: any;
  processTypes = [
    { name: 'AVAILABLE', id: 'AVAILABLE' },
    { name: 'NOT_AVAILABLE', id: 'NOT_AVAILABLE' }
  ];

  constructor(private modal: NzModalRef, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getMerchantAddresses(this.data.id).subscribe((res) => {
      console.log(res);
      this.addresses = res.rows;
      // this.orders = res.orders;
      // this.retailer = this.orders.length ? (this.retailer = this.orders[0].retailer) : {};
    });
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }
}
