import { AuthenticationService } from '@app/_services/authentication.service';
import { ProductService } from '@app/_services/product/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderService } from './../../../_services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {
  selectedValue = '';
  listOfOption = [{ value: 'hello', text: 'Hello' }];
  dataFromServer = [
    { value: 'bek', text: 'Bek' },
    { value: 'silas', text: 'Silas' },
    { value: 'kaleb', text: 'Kaleb' },
    { value: 'tilahun', text: 'Tilahun' }
  ];
  searchPlaceHolder = 'Search supplier code, name, product';
  merchant;
  products = [];
  merchantCode;

  isVisibleTop = false;
  cartProducts = [];
  nzFilterOption = () => true;
  @ViewChild('successMessage', { static: false }) template?: TemplateRef<{}>;
  orderAdded = false;
  popOverMessage = 'New Order Added To Cart';
  q = '';
  type = 'product';
  firstReload = true;
  cartMerchantId = '';
  cartMerchantName = '';
  processing = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private notificationService: NzNotificationService,
    private location: Location,
    private productService: ProductService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((res) => {
      this.type = res.type || 'product';
      this.q = res.q || '';
      if (!this.firstReload) {
        this.getProducts();
      } else {
        this.firstReload = false;
      }
    });

    this.route.data.subscribe((data: { data: { product: any; merchant: any; merchantCode } }) => {
      this.merchant = data.data.merchant || {};
      this.products = data.data.product.rows || [];
      this.merchantCode = data.data.merchantCode || {};
      console.log(this.merchant);
    });

    this.cartProducts = JSON.parse(localStorage.getItem('order_cart'))?.orders || [];
    this.cartMerchantId = JSON.parse(localStorage.getItem('order_cart'))?.MerchantId || '';
    this.cartMerchantName = JSON.parse(localStorage.getItem('order_cart'))?.MerchantName || '';
  }

  getProducts() {
    this.productService.getProducts({ q: this.q }).subscribe((res) => {
      this.products = res.rows;
    });
  }

  search(event) {
    this.listOfOption = this.dataFromServer.filter((d) => d.value.includes(event.toLowerCase()));
    if (!this.listOfOption.length) {
      this.listOfOption.push({ value: event, text: event });
    }
  }

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  clearCart(): void {
    localStorage.removeItem('order_cart');
    this.cartProducts = [];
    this.cartMerchantId = '';
    this.cartMerchantName = '';
    this.isVisibleTop = false;
  }

  close(): void {
    this.isVisibleTop = false;
  }

  addProductToCart(event) {
    if (event.amount && event.product) {
      if (this.merchant.id != this.cartMerchantId) {
        this.clearCart();
      }
      let tempProduct = { id: event.product.id, name: event.product.name, amount: event.amount };

      let index = -1;
      this.cartProducts = this.cartProducts.map((p, i) => {
        if (p.id == tempProduct.id) {
          index = i;
          this.popOverMessage = 'Cart Order Updated';
          this.orderAdded = true;
          setTimeout(() => {
            this.orderAdded = false;
          }, 2500);
          return tempProduct;
        }
        return p;
      });

      if (index == -1) {
        this.cartProducts.push(tempProduct);
        this.popOverMessage = 'New Order Added To Cart';
        this.orderAdded = true;
        setTimeout(() => {
          this.orderAdded = false;
        }, 2500);
      }

      console.log({
        orders: this.cartProducts,
        MerchantId: this.merchant.id,
        MerchantName: this.merchant.name
      });

      this.cartMerchantId = this.merchant.id;
      this.cartMerchantName = this.merchant.name;
      localStorage.setItem(
        'order_cart',
        JSON.stringify({
          orders: this.cartProducts,
          MerchantId: this.merchant.id,
          MerchantName: this.merchant.name
        })
      );
    }
  }

  processOrder() {
    if (this.cartProducts.length && !this.processing) {
      this.processing = true;
      if (
        !this.authenticationService.userValue ||
        this.authenticationService.userValue.role != 'CONSUMER'
      ) {
        if (this.authenticationService.userValue) {
          this.authenticationService.logout();
        }
        this.router.navigate(['/landing/login'], {
          queryParams: { returnUrl: '/retailer/process_order' }
        });
      } else {
        // console.log('processing order');
        let orderData = {
          MerchantId: this.cartMerchantId,
          orders: this.cartProducts.map((cp) => {
            return { productId: cp.id, quantity: cp.amount };
          })
        };

        this.orderService.processCartOrders(orderData).subscribe((res) => {
          if (res) {
            this.notificationService.template(this.template, {});
            localStorage.removeItem('order_cart');
            this.goBack();
            this.close();
            this.processing = false;
          }
          this.processing = false;
        });
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
