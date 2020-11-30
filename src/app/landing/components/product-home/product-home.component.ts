import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  @Input() product;
  @Input() q;
  @Input() type;
  constructor() {}

  ngOnInit(): void {
    console.log(this.product);
  }

  formatCompanyName() {
    return this.product.merchant.name.toLowerCase().replace(/ /g, '_');
  }
}
