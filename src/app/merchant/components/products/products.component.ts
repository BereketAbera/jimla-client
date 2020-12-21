import { EditProductModalComponent } from './../edit-product-modal/edit-product-modal.component';
import { AddProductModalComponent } from './../add-product-modal/add-product-modal.component';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ProductService } from './../../../_services/product/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, EventEmitter, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products = [];
  count = 0;
  page = 0;
  pageSize = 5;
  firstReload = true;
  productClose: EventEmitter<any> = new EventEmitter();
  @ViewChild('successMessage', { static: false }) template?: TemplateRef<{}>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private modal: NzModalService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.products = res.data.rows;
      this.count = res.data.count;
    });

    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      if (!this.firstReload) {
        this.getProducts();
      } else {
        this.firstReload = false;
      }
    });

    this.productClose.subscribe((res) => {
      if (res && res.success) {
        if (res.type == 'edit') {
          this.products.map((product) => {
            if (product.id == res.product.id) {
              return res.product;
            }
            return product;
          });
        } else if (res && res.success && res.product) {
          this.firstReload = true;
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: 0 },
            queryParamsHandling: 'merge'
          });
          this.getProducts();
          this.firstReload = false;
        }
      }
    });
  }

  getProducts() {
    this.productService
      .getMerchantProduct(this.authenticationService.userValue.producerId, {
        page: this.page,
        pageSize: this.pageSize
      })
      .subscribe((res) => {
        this.products = res.rows;
        this.count = res.count;
      });
  }

  pageChanged(event) {
    this.setUrlValues({ page: event - 1 });
  }

  pageSizeChanged(event) {
    setTimeout(() => {
      this.setUrlValues({ pageSize: event });
    }, 1);
  }

  setUrlValues(sObj) {
    let keys = Object.keys(sObj);
    let pObj = {};
    keys.map((key) => {
      pObj[key] = sObj[key];
    });
    const queryParams: Params = {
      ...pObj
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

  addProduct() {
    this.modal.create({
      nzTitle: 'Add Product',
      nzContent: AddProductModalComponent,
      nzAfterClose: this.productClose,
      nzMaskClosable: false
    });
  }

  editProduct(product) {
    this.modal.create({
      nzTitle: 'Edit Product',
      nzComponentParams: { data: product },
      nzContent: EditProductModalComponent,
      nzAfterClose: this.productClose,
      nzMaskClosable: false
    });
  }

  confirmDelete(product) {
    this.productService.deleteProduct(product.id).subscribe((res) => {
      if (res) {
        this.notificationService.template(this.template, {});
        this.getProducts();
      }
    });
  }

  cancelDelete() {
    console.log('canceled');
  }
}
