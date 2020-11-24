import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_services/product/product.service';

@Component({
  selector: 'app-home-second',
  templateUrl: './home-second.component.html',
  styleUrls: ['./home-second.component.scss']
})
export class HomeSecondComponent implements OnInit {
  products;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts({}).subscribe(
      (data) => {
        console.log(data);
        this.products = data.rows;
      },
      (error) => {}
    );
  }
}
