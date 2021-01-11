import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from '@app/_services/admin/admin.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})
export class DepositsComponent implements OnInit {
  deposits = [];
  count = 0;
  page = 0;
  pageSize = 0;
  firstReload = true;
  producerId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res: { data: any }) => {
      // console.log(res);
      this.deposits = res.data.rows;
      this.count = res.data.count;
    });

    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      this.producerId = parseInt(res['producerId']) || null;

      if (!this.firstReload) {
        this.getOrderGroups();
      } else {
        this.firstReload = false;
      }
    });
  }

  getOrderGroups() {
    this.adminService
      .getDeposits({
        page: this.page,
        pageSize: this.pageSize,
        producerId: this.producerId
      })
      .subscribe((res) => {
        this.deposits = res.rows;
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
}
