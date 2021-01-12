import { MessageService } from './../../../_services/message/message.service';
import { UserService } from '@app/_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { CategoryListService } from '@app/_services/product/category-list.service';
import { ProductService } from '@app/_services/product/product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { BroadcastErrorService } from '@app/_services/broadcast-error.service';

@Component({
  selector: 'app-bulk-message-modal',
  templateUrl: './bulk-message-modal.component.html',
  styleUrls: ['./bulk-message-modal.component.scss']
})
export class BulkMessageModalComponent implements OnInit {
  error = '';
  loading = false;
  categories = [];

  messageForm: FormGroup;

  constructor(
    private modal: NzModalRef,
    private productService: ProductService,
    private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
    private broadCastErrorService: BroadcastErrorService
  ) {}

  ngOnInit(): void {
    this.userService.getConsumerCategories().subscribe((res) => {
      this.categories = res;
    });
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required],
      categoryId: [0, Validators.required]
    });
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }

  addBulkMessageSubmit(): void {
    if (this.messageForm.invalid) {
      this.messageForm.markAllAsTouched();
      this.error = 'Some fields are not valid';
    } else {
      this.loading = true;
      this.error = '';
      this.messageService.sendBulkMessage(this.messageForm.value).subscribe(
        (res: any) => {
          this.loading = false;
          this.addSuccess(res);
          this.broadCastErrorService.error.next(false);
        },
        (err) => {
          if (err == 'NOT_ALLOWED') {
            this.error = 'Your Account Is Not Allowed To Send Bulk Messages';
          } else {
            this.error = err;
          }
        }
      );
    }
  }

  addSuccess(message) {
    this.modal.destroy({ success: true, message, type: 'add' });
    this.modalService.success({
      nzTitle: 'Process Received!!',
      nzStyle: { bottom: '20px' }
    });

    setTimeout(() => {
      this.modalService.closeAll();
    }, 2000);
  }
}
