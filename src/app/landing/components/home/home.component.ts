import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products = [
    {
      name: 'hello'
    },
    2,
    3,
    4
  ];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {}
    );
  }
}
