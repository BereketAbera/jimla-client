import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {
  @Input() company;
  constructor() {}

  ngOnInit(): void {
    // console.log(this.company);
  }

  formatCompanyName() {
    return this.company.name.toLowerCase().replace(/ /g, '_');
  }
}
