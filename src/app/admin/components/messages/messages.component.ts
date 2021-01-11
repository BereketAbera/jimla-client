import { AdminService } from '@app/_services/admin/admin.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '@app/_services/user.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  bulkMessageClose: EventEmitter<any> = new EventEmitter();
  batches = [];
  count = 0;
  page = 0;
  pageSize = 5;
  firstReload = true;
  code = null;
  categories = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getConsumerCategories().subscribe((res) => {
      this.categories = res;
    });
    this.route.data.subscribe((res) => {
      this.batches = res.data.rows;
      this.count = res.data.count;
    });

    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      this.code = parseInt(res['code']) || null;
      if (!this.firstReload) {
        this.getBatches();
      } else {
        this.firstReload = false;
      }
    });
  }

  getBatches() {
    this.adminService
      .getBatchMessage({
        page: this.page,
        pageSize: this.pageSize,
        code: this.code
      })
      .subscribe((res: any) => {
        this.batches = res.rows;
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

  // showMessages(batch) {
  //   this.router.navigate(['/merchant/batch_messages/messages'], {
  //     queryParams: { batchId: batch.id }
  //   });
  // }

  // showDetail(batch) {
  //   console.log(batch);
  // }

  getCategoryName(id) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == id) return this.categories[i].name;
    }
    return id;
  }
}
