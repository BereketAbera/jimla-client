import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  @Input() product;
  constructor() {}

  ngOnInit(): void {}
}
