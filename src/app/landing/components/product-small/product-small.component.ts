import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-small',
  templateUrl: './product-small.component.html',
  styleUrls: ['./product-small.component.scss']
})
export class ProductSmallComponent implements OnInit {
  visible = false;
  amount = 1;

  @Input('product') product;

  constructor() {}

  ngOnInit(): void {
    console.log(this.product);
  }

  close() {
    this.visible = false;
  }
}
