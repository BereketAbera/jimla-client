import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userClose: EventEmitter<any> = new EventEmitter();
  page: any = 0;
  pageSize: any = 5;
  users: any = [];
  count: any = 0;
  address;
  firstReload = true;

  constructor(
    private modal: NzModalService,
    private router: Router,
    private route: ActivatedRoute,
    private userSerive: UserService
  ) {
    this.route.data.subscribe((res) => {
      this.address = { data: res.data };
      this.users = res.resData.rows;
      this.count = res.resData.count;
      // this.count = res.data.count;
    });
  }

  ngOnInit(): void {
    this.userClose.subscribe((res) => {
      this.getUsers();
    });
    this.route.queryParams.subscribe((res) => {
      this.page = parseInt(res['page']) || 0;
      this.pageSize = parseInt(res['pageSize']) || 5;
      if (!this.firstReload) {
        this.getUsers();
      } else {
        this.firstReload = false;
      }
    });
  }

  addUser() {
    this.modal.create({
      nzTitle: 'Add User',
      nzContent: AddUserModalComponent,
      nzAfterClose: this.userClose,
      nzComponentParams: this.address
    });
  }

  getUsers() {
    this.userSerive
      .getConsumerUser({ page: this.page, pageSize: this.pageSize })
      .subscribe((res) => {
        this.users = res.rows;
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

  deactivateUser() {
    this.userSerive.updateUser({ status: 2 }).subscribe(
      (data) => {},
      (error) => {}
    );
  }

  editUser(){
    this.userSerive.updateUser({}).subscribe(data=>{
      
    })
  }
}
