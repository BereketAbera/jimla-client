import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-short-product',
  templateUrl: './short-product.component.html',
  styleUrls: ['./short-product.component.scss']
})
export class ShortProductComponent implements OnInit {
  @Input() cardTitle;
  @Input() cardImg;

  constructor() {}

  ngOnInit(): void {
    console.log(this.cardTitle)
  }
}
