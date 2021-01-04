import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MessageService } from '@app/_services/message/message.service';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-total-messages',
  templateUrl: './total-messages.component.html',
  styleUrls: ['./total-messages.component.scss']
})
export class TotalMessagesComponent implements OnInit {
  messages = [];
  count = 0;
  page = 0;
  pageSize = 5;
  firstReload = true;
  batchId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.messages = res.data.rows;
      this.count = res.data.count;
    });

    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      this.batchId = parseInt(res['batchId']) || null;
      if (!this.firstReload) {
        this.getMessages();
      } else {
        this.firstReload = false;
      }
    });
  }

  getMessages() {
    this.messageService
      .getMessage({
        page: this.page,
        pageSize: this.pageSize,
        batchId: this.batchId
      })
      .subscribe((res: any) => {
        this.messages = res.rows;
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
