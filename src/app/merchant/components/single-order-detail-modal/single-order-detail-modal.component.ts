import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-single-order-detail-modal',
  templateUrl: './single-order-detail-modal.component.html',
  styleUrls: ['./single-order-detail-modal.component.scss']
})
export class SingleOrderDetailModalComponent implements OnInit {
  @Input('data') data;

  constructor(private modal: NzModalRef) {}

  ngOnInit(): void {
    // console.log(this.data);
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }
}
