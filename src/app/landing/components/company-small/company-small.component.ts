import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-small',
  templateUrl: './company-small.component.html',
  styleUrls: ['./company-small.component.scss']
})
export class CompanySmallComponent implements OnInit {
  @Input() company;
  constructor() {}

  ngOnInit(): void {}
}
