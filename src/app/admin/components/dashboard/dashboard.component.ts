import { Component, OnInit } from '@angular/core';
import { AdminService } from '@app/_services/admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  report;
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboards().subscribe(
      (data) => {
        console.log(data)
        this.report= data;
        this.report.user = data.producer+data.consumer;
      },
      (error) => {}
    );
  }
}
