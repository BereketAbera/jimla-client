import { OrderService } from '@app/_services/order/order.service';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit {
  cartProducts = [];
  MerchantId = null;

  @ViewChild('successMessage', { static: false }) template?: TemplateRef<{}>;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    let cartOrder = JSON.parse(localStorage.getItem('order_cart'));
    this.cartProducts = cartOrder?.orders;
    this.MerchantId = cartOrder?.MerchantId;

    if (!this.cartProducts || !this.MerchantId) {
      this.router.navigate(['/retailer']);
    }
  }

  clearCart() {
    localStorage.removeItem('order_cart');
    this.cartProducts = [];
    this.MerchantId = null;
    this.router.navigate(['/retailer']);
  }

  processOrder() {
    if (this.cartProducts.length) {
      let orderData = {
        MerchantId: this.MerchantId,
        orders: this.cartProducts.map((cp) => {
          return { productId: cp.id, quantity: cp.amount };
        })
      };

      this.orderService.processCartOrders(orderData).subscribe((res) => {
        if (res) {
          this.notificationService.template(this.template, {});
          this.clearCart();
        }
      });
    }
  }
}
