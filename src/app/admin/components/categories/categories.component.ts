import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '@app/_services/admin/admin.service';
import { CategoryListService } from '@app/_services/product/category-list.service';
import { UserService } from '@app/_services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  consumer_categories: any = [];
  categoryClose: EventEmitter<any> = new EventEmitter();
  category: any = { category: true };
  businessType: any = { businessType: true };
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private modal: NzModalService,
    private userService: UserService,
    private message: NzMessageService,
    private categoryService: CategoryListService
  ) {
    this.route.data.subscribe((res) => {
      this.categories = res.data;
      this.consumer_categories = res.consData;
    });
  }

  ngOnInit(): void {
    this.categoryClose.subscribe((res) => {
      this.getCategories();
    });
  }

  getCategories() {
    this.userService.getConsumerCategories().subscribe((data) => {
      this.consumer_categories = data;
    });

    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  addCategory() {
    this.modal.create({
      nzTitle: 'Add Category',
      nzContent: AddCategoryComponent,
      nzAfterClose: this.categoryClose,
      nzComponentParams: this.category
    });
  }

  addBusinessType() {
    this.modal.create({
      nzTitle: 'Add Business Type',
      nzContent: AddCategoryComponent,
      nzAfterClose: this.categoryClose,
      nzComponentParams: this.businessType
    });
  }

  deleteBusinessType(id) {
    this.adminService.deleteCategory(id).subscribe(
      (data) => {
        this.createMessage('success', 'Deleted Succesfully.');
        this.getCategories();
      },
      (error) => {}
    );
  }
  deleteCategory(id) {
    this.adminService.deleteCategory(id).subscribe(
      (data) => {
        this.createMessage('success', 'Deleted Succesfully.');
        this.getCategories();
      },
      (error) => {}
    );
  }
  createMessage(type: string, data): void {
    this.message.create(type, data);
  }
}
