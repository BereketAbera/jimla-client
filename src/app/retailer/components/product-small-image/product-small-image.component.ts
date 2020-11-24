import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-small-image',
  templateUrl: './product-small-image.component.html',
  styleUrls: ['./product-small-image.component.scss']
})
export class ProductSmallImageComponent implements OnInit {
  visible = false;
  amount = 1;

  @Input('product') product;
  @Output('addProductToCart') addProductToCart: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    // console.log('Hello');
    // console.log(this.product);
  }

  close() {
    this.visible = false;
  }

  add() {
    this.addProductToCart.emit({ amount: this.amount, product: this.product });
    this.close();
  }
}
