import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AdminService } from '@app/_services/admin/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  count;
  products = [];
  categories = [];
  page = 0;
  pageSize = 5;
  firstReload = true;

  //filter values
  filterActive = false;
  date;
  startDate;
  endDate;
  status = '';
  category = '';
  company = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.products = res.data.rows;
      this.count = res.data.count;
      this.categories = res.categories;
    });

    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      this.company = res['company'] || '';
      this.category = res['category'] || '';
      this.status = res['status'] || '';
      this.startDate = res['startDate'] || '';
      this.endDate = res['endDate'] || '';

      if (this.startDate && this.endDate) {
        this.date = [new Date(this.startDate), new Date(this.endDate)];
      } else {
        this.date = [];
      }

      if (!this.firstReload) {
        this.getProducts();
      } else {
        this.firstReload = false;
      }
    });
  }

  getProducts() {
    this.adminService
      .getProducts({
        page: this.page,
        pageSize: this.pageSize,
        company: this.company,
        category: this.category,
        status: this.status,
        startDate: this.startDate,
        endDate: this.endDate
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

  filter() {
    this.filterActive = !this.filterActive;
  }

  applyFilter() {
    this.setUrlValues({
      status: this.status,
      category: this.category,
      company: this.company,
      startDate: this.startDate,
      endDate: this.endDate
    });
    this.filter();
  }

  clearFilter() {
    this.setUrlValues({
      status: '',
      category: '',
      company: '',
      startDate: '',
      endDate: ''
    });
    this.filter();
  }

  onDateChange(event: Array<Date>) {
    this.startDate = event[0].toISOString().split('T')[0];
    this.endDate = event[1].toISOString().split('T')[0];
  }
}
