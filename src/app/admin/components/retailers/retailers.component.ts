import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminService } from '@app/_services/admin/admin.service';

@Component({
  selector: 'app-retailers',
  templateUrl: './retailers.component.html',
  styleUrls: ['./retailers.component.scss']
})
export class RetailersComponent implements OnInit {
  count;
  retailers;
  page = 0;
  pageSize = 5;
  firstReload = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.retailers = res.data.rows;
      this.count = res.data.count;
    });

    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      if (!this.firstReload) {
        this.getRetailers();
      } else {
        this.firstReload = false;
      }
    });
  }

  getRetailers() {
    this.adminService
      .getRetailers({ page: this.page, pageSize: this.pageSize })
      .subscribe((res) => {
        this.retailers = res.rows;
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
