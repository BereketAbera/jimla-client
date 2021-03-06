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
      // console.log(res)
      this.address = { data: res.data.rows };
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
    console.log(event)
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
  createConfirmDelete(data){
    this.modal.confirm({
      nzTitle: `<b>Do you Want to delete these user?</b>`,
      nzContent: '<p>This action cannot be undo.</p>',
      nzOnOk: () => this.deleteUser(data),
      nzOkType: 'danger',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  deactivateUser(data) {
    this.userSerive.updateUser({ status: "SUSPENDED",id:data.id }).subscribe(
      (data) => {
        this.getUsers()
      },
      (error) => {}
    );
  }
  deleteUser(data) {
    this.userSerive.deleteUser({ status: "DELETED",id:data.id }).subscribe(
      (data) => {
        console.log(data);
        this.getUsers()
      },
      (error) => {}
    );
  }

  editUser(data){
   this.router.navigate([`edit/${data.id}`],{relativeTo:this.route})
  }
}
