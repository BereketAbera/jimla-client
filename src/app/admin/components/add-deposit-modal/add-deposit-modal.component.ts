import { AdminService } from '@app/_services/admin/admin.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '@app/_services/message/message.service';
import { ProductService } from '@app/_services/product/product.service';
import { UserService } from '@app/_services/user.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-deposit-modal',
  templateUrl: './add-deposit-modal.component.html',
  styleUrls: ['./add-deposit-modal.component.scss']
})
export class AddDepositModalComponent implements OnInit {
  error = '';
  loading = false;
  categories = [];

  depositForm: FormGroup;
  @Input('data') data;

  constructor(
    private modal: NzModalRef,
    private adminService: AdminService,
    private modalService: NzModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.depositForm = this.formBuilder.group({
      value: ['', [Validators.required, Validators.min(10)]],
      producerId: this.data.id
    });
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }

  addDepositSubmit(): void {
    if (this.depositForm.invalid) {
      this.depositForm.markAllAsTouched();
      this.error = 'Some fields are not valid';
    } else {
      this.loading = true;
      this.error = '';
      this.adminService.addDeposit(this.depositForm.value).subscribe((res) => {
        this.loading = false;
        this.addSuccess(res);
      });
    }
  }

  addSuccess(message) {
    this.modal.destroy({ success: true, message });
    this.modalService.success({
      nzTitle: 'Deposit Added',
      nzStyle: { bottom: '20px' }
    });

    setTimeout(() => {
      this.modalService.closeAll();
    }, 2000);
  }
}
