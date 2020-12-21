import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/_services/authentication.service';
import { CategoryListService } from '@app/_services/product/category-list.service';
import { ProductService } from '@app/_services/product/product.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss']
})
export class EditProductModalComponent implements OnInit {
  error = '';
  loading = false;
  categories = [];
  subCategories = [];
  @Input('data') data;

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
    this.productService.getCategorySubCategories(this.data.categoryId).subscribe((res) => {
      this.subCategories = res;
    });

    this.productForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      description: [this.data.description, Validators.required],
      categoryId: [this.data.categoryId, [Validators.required, Validators.min(1)]],
      subCategoryId: [this.data.subCategoryId, [Validators.required, Validators.min(1)]],
      unitPrice: [this.data.unitPrice, [Validators.required, Validators.min(1)]],
      unitInStock: [this.data.unitInStock, [Validators.required, Validators.min(1)]],
      quantityPerUnit: [this.data.quantityPerUnit, [Validators.required, Validators.min(1)]],
      tax: [this.data.tax]
    });
  }

  destroyModal(): void {
    this.modal.destroy('success');
  }

  editProductSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.error = 'Some fields are not valid';
    } else {
      this.loading = true;
      this.error = '';
      this.productService
        .editProduct(this.authenticationService.userValue.producerId, {
          id: this.data.id,
          ...this.productForm.value
        })
        .subscribe((res) => {
          this.loading = false;
          this.addSuccess(res);
        });
    }
  }

  setSubCategoryId() {}

  addSuccess(product) {
    this.modal.destroy({ success: true, product, type: 'edit' });
    this.modalService.success({
      nzTitle: 'Successfully updated!!',
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
