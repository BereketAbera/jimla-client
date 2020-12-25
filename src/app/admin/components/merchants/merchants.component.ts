import { MerchantAddressesModalComponent } from './../merchant-addresses-modal/merchant-addresses-modal.component';
import { AdminService } from '@app/_services/admin/admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent implements OnInit {
  count;
  merchants;
  page = 0;
  pageSize = 5;
  firstReload = true;
  addressesClose: EventEmitter<any> = new EventEmitter();

  //filter values
  filterActive = false;
  date;
  startDate;
  endDate;
  status = '';
  company = '';
  type = '';
  code = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.merchants = res.data.rows;
      this.count = res.data.count;
    });

    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      this.company = res['company'] || '';
      this.code = res['code'] || '';
      this.type = res['type'] || '';
      this.status = res['status'] || '';
      this.startDate = res['startDate'] || '';
      this.endDate = res['endDate'] || '';

      if (this.startDate && this.endDate) {
        this.date = [new Date(this.startDate), new Date(this.endDate)];
      } else {
        this.date = [];
      }

      if (!this.firstReload) {
        this.getMerchants();
      } else {
        this.firstReload = false;
      }
    });
  }

  getMerchants() {
    this.adminService
      .getMerchants({
        page: this.page,
        pageSize: this.pageSize,
        status: this.status,
        type: this.type,
        company: this.company,
        code: this.code,
        startDate: this.startDate,
        endDate: this.endDate
      })
      .subscribe((res) => {
        this.merchants = res.rows;
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

  clearFilter() {
    this.setUrlValues({
      status: '',
      type: '',
      company: '',
      code: '',
      startDate: '',
      endDate: ''
    });
    this.filter();
  }

  applyFilter() {
    this.setUrlValues({
      status: this.status,
      type: this.type,
      company: this.company,
      code: this.code,
      startDate: this.startDate,
      endDate: this.endDate
    });
    this.filter();
  }

  onDateChange(event: Array<Date>) {
    this.startDate = event[0].toISOString().split('T')[0];
    this.endDate = event[1].toISOString().split('T')[0];
  }

  getMerchantProducts(name) {
    this.router.navigate(['/jm-admin/products'], { queryParams: { company: name } });
  }

  getMerchantOrders(code) {
    this.router.navigate(['/jm-admin/orders'], { queryParams: { code } });
  }

  filter() {
    this.filterActive = !this.filterActive;
  }

  updateMerchantStatus(merchant) {
    this.adminService
      .updateMerchant(merchant.id, { verified: !merchant.verified })
      .subscribe((res) => {
        this.merchants = this.merchants.map((merchant) => {
          if (merchant.id == res.id) {
            return { ...merchant, ...res };
          }
          return merchant;
        });
      });
  }

  updateMerchantCompanyType(merchant) {
    this.adminService
      .updateMerchant(merchant.id, {
        compType: merchant.compType == 'NORMAL' ? 'FEATURED' : 'NORMAL'
      })
      .subscribe((res) => {
        this.merchants = this.merchants.map((merchant) => {
          if (merchant.id == res.id) {
            return { ...merchant, ...res };
          }
          return merchant;
        });
      });
  }

  showAddresses(merchant) {
    this.modal.create({
      nzComponentParams: { data: merchant },
      nzTitle: `${merchant.name} Addresses`,
      nzContent: MerchantAddressesModalComponent,
      nzAfterClose: this.addressesClose
    });
  }
}
