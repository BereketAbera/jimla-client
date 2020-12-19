import { OrderService } from '@app/_services/order/order.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Location, ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-merchant-create-order-voice',
  templateUrl: './create-order-voice.component.html',
  styleUrls: ['./create-order-voice.component.scss']
})
export class CreateOrderVoiceComponent implements OnInit {
  selectedOrderGroup = null;
  selectedProduct = null;
  quantity = null;
  isVisible = false;
  leftDisabled = false;

  products = [];
  selectedProducts = [];

  selectedProductsOrders = [];
  address = null;
  merchant = null;
  orderGroup = null;
  @ViewChild('successMessage', { static: false }) template?: TemplateRef<{}>;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private notificationService: NzNotificationService,
    private router: Router,
    private location: Location,
    private viewportScroller: ViewportScroller
  ) {
    this.route.data.subscribe((res: { data: any }) => {
      this.address = res.data.address;
      this.merchant = res.data.merchant;
      this.orderGroup = res.data.orderGroup;
      this.products = res.data.products;
    });
  }

  ngOnInit(): void {}

  handleAdd(): void {
    console.log(this.selectedProduct);
    if (!this.selectedProduct) return;
    let product;
    this.products.map((p) => {
      if (p.name == this.selectedProduct) {
        product = p;
      }
    });
    if (product && this.quantity >= 1) {
      this.addToSelected({ ...product, quantity: this.quantity });
      this.selectedProduct = null;
      this.quantity = null;
      this.isVisible = false;
    }
  }

  addToSelected(product) {
    let exists = false;
    this.selectedProducts = this.selectedProducts.map((p) => {
      if (p.id == product.id) {
        exists = true;
        return { ...p, quantity: product.quantity };
      }
      return p;
    });

    if (!exists) {
      this.selectedProducts.push(product);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }

  deleteProduct(product): void {
    this.selectedProducts = this.selectedProducts.filter((p) => !(p.id == product.id));
  }

  editProduct(product): void {
    this.quantity = product.quantity;
    this.selectedProduct = product.name;
    this.showModal();
  }

  continue() {
    if (this.selectedProducts.length <= 0) return;
    this.leftDisabled = true;
    this.selectedProductsOrders = this.selectedProducts;
    // console.log('scrolling to anchor');
    this.viewportScroller.scrollToAnchor('order_produts');
  }

  back() {
    this.leftDisabled = false;
    this.viewportScroller.scrollToAnchor('process_orders');
  }

  submitOrder() {
    let orders = this.selectedProductsOrders.map((sp) => {
      return { productId: sp.id, quantity: sp.quantity };
    });
    let orderData = {
      order_group_id: this.orderGroup.id,
      orders
    };
    // console.log(orderData);
    // return;

    this.orderService.createVoiceOrder(orderData).subscribe((res: any) => {
      if (res && res.orders && res.orders.length > 0) {
        this.notificationService.template(this.template, {});
        this.goBack();
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
