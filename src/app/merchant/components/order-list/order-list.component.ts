import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OrderService } from '@app/_services/order/order.service';

@Component({
  selector: 'app-merchant-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  orders = [];
  count = 0;
  page = 0;
  pageSize = 0;
  firstReload = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderSrevice: OrderService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res: { data: any }) => {
      // console.log(res);
      this.orders = res.data.rows;
      this.count = res.data.count;
    });
    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      if (!this.firstReload) {
        this.getOrders();
      } else {
        this.firstReload = false;
      }
    });
  }

  getOrders() {
    this.orderSrevice
      .getMerchantOrders({ page: this.page, pageSize: this.pageSize })
      .subscribe((res: { orders: any }) => {
        this.orders = res.orders.rows;
        this.count = res.orders.count;
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

  process(order_group) {
    this.router.navigate([`/orders/create_order_voice/${order_group.id}`]);
  }
}
