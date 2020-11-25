import { OrderService } from '@app/_services/order/order.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-order-group-list',
  templateUrl: './order-group-list.component.html',
  styleUrls: ['./order-group-list.component.scss']
})
export class OrderGroupListComponent implements OnInit {
  order_groups = [];
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
      this.order_groups = res.data.rows;
      this.count = res.data.count;
    });
    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      if (!this.firstReload) {
        this.getOrderGroups();
      } else {
        this.firstReload = false;
      }
    });
  }

  getOrderGroups() {
    this.orderSrevice
      .getMerchantOrderGroups({ page: this.page, pageSize: this.pageSize })
      .subscribe((res: { order_groups: any }) => {
        this.order_groups = res.order_groups.rows;
        this.count = res.order_groups.count;
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
    this.router.navigate([`/merchant/order_groups/create_order_voice/${order_group.id}`]);
  }
}
