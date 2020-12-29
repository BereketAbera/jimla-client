import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@app/_services/admin/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  formG: FormGroup;
  error: string;
  loading: boolean;
  category:any;
  constructor(
    private formBuilder: FormBuilder,
    private modal: NzModalRef,
    private adminService: AdminService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    console.log(this.modal.getContentComponent());
    if(this.modal.getContentComponent().data){
      this.category = this.modal.getContentComponent().data;
    }
    this.formG = this.formBuilder.group({
      name: [this.category?this.category.name:'', Validators.required]
    });
  }

  get controls() {
    return this.formG.controls;
  }

  addCategory(): void {
    if (this.formG.invalid) {
      this.formG.markAllAsTouched();
      this.error = 'Some field are not valid';
    } else {
      this.loading = true;
      this.error = '';
      if (this.modal.getContentComponent().category) {
        this.adminService.addCategory(this.formG.value).subscribe(
          (data) => {
            this.createMessage('success', 'Created succesfully.');
          },
          (error) => {
            this.createMessage('error', 'Fail to Create! Try again.');
          }
        );
      }

      if (this.modal.getContentComponent().businessType) {
        this.adminService.addBussinesType(this.formG.value).subscribe(
          (data) => {
            this.createMessage('success', 'Created succesfully.');
          },
          (error) => {
            this.createMessage('error', 'Fail to Create! Try again.');
          }
        );
      }
    }
  }
  editCategory():void{
    if (this.formG.invalid) {
      this.formG.markAllAsTouched();
      this.error = 'Some field are not valid';
    }else{
      //Call Servicess
      this.adminService.editBussinesType(this.category.id,this.formG.value).subscribe(data=>{
        this.createMessage('success',"Editted succesfully")
      },error=>{
        this.createMessage('error',error)
      })
      
      this.destroyModal()
    }
  }
  createMessage(type: string, data): void {
    this.message.create(type, data);
    this.destroyModal();
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }


}
