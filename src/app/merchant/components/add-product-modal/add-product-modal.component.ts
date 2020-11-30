import { CategoryListService } from './../../../_services/product/category-list.service';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ProductService } from '@app/_services/product/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {
  error = '';
  loading = false;
  categories = [];
  subCategories = [];

  productForm: FormGroup;

  constructor(
    private modal: NzModalRef,
    private productService: ProductService,
    private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private categoryService: CategoryListService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res;
    });
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [0, [Validators.required, Validators.min(1)]],
      subCategoryId: [0, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(1)]],
      unitInStock: [0, [Validators.required, Validators.min(1)]],
      quantityPerUnit: [0, [Validators.required, Validators.min(1)]],
      tax: ['']
    });
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }

  addProductSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.error = 'Some filed are not valid';
    } else {
      this.loading = true;
      this.error = '';
      this.productService
        .addProduct(this.authenticationService.userValue.producerId, this.productForm.value)
        .subscribe((res) => {
          this.loading = false;
          this.addSuccess(res);
        });
    }
  }

  addSuccess(product) {
    this.modal.destroy({ success: true, product });
    this.modalService.success({
      nzTitle: 'Successfully created!!',
      nzStyle: { bottom: '20px' }
    });

    setTimeout(() => {
      this.modalService.closeAll();
    }, 2000);
  }

  addSubCategory(event) {
    // console.log(event.value);
    this.productService
      .addCategorySubCategory(event.value, this.productForm.controls['categoryId'].value)
      .subscribe((res) => {
        this.subCategories.push(res);
      });
  }

  categoryChanged(event) {
    this.productForm.controls['subCategoryId'].setValue('');
    this.productService.getCategorySubCategories(event).subscribe((res) => {
      this.subCategories = res;
    });
  }
}
