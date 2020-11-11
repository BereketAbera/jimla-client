import { OrderService } from './../../../_services/order/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  products;
  merchantCode;

  isVisibleTop = false;
  cartProducts = [];
  nzFilterOption = () => true;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { data: { products: any; merchant: any; merchantCode } }) => {
      // console.log(data);
      this.merchant = data.data.merchant;
      this.products = data.data.products.rows;
      this.merchantCode = data.data.merchantCode;
      // console.log(this.merchantCode);
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

  close(): void {
    this.isVisibleTop = false;
  }

  addProductToCart(event) {
    if (event.amount && event.product) {
      let tempProduct = { ...event.product, amount: event.amount };

      let index = -1;
      this.cartProducts = this.cartProducts.map((p, i) => {
        if (p.id == tempProduct.id) {
          index = i;
          return tempProduct;
        }
        return p;
      });

      if (index == -1) {
        this.cartProducts.push(tempProduct);
      }
    }
  }

  processOrder() {
    if (this.cartProducts.length) {
      let orderData = {
        MerchantId: this.merchant.id,
        orders: this.cartProducts.map((cp) => {
          return { productId: cp.id, quantity: cp.amount };
        })
      };

      this.orderService.processCartOrders(orderData).subscribe((res) => {
        if (res) {
          this.close();
        }
      });
    }
  }
}
