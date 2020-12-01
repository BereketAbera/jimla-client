import { AddProductModalComponent } from './../add-product-modal/add-product-modal.component';
import { AuthenticationService } from '@app/_services/authentication.service';
import { ProductService } from './../../../_services/product/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NzModalService } from 'ng-zorro-antd/modal';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private modal: NzModalService
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
      if (res && res.success && res.product) {
        // console.log(res);
        this.firstReload = true;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { page: 0 },
          queryParamsHandling: 'merge'
        });
        this.getProducts();
        this.firstReload = false;
        // this.changeType(res.userId, 'PAID');
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
      nzAfterClose: this.productClose
    });
  }
}
