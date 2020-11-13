import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedValue = '';
  listOfOption = [{ value: 'hello', text: 'Hello' }];
  dataFromServer = [
    { value: 'bek', text: 'Bek' },
    { value: 'silas', text: 'Silas' },
    { value: 'kaleb', text: 'Kaleb' },
    { value: 'tilahun', text: 'Tilahun' }
  ];
  searchPlaceHolder = 'Search supplier code, name, product';
  products = [];

  nzFilterOption = () => true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        console.log(data)
        this.products = data.rows;
      },
      (error) => {}
    );
  }

  search(event) {
    this.listOfOption = this.dataFromServer.filter((d) => d.value.includes(event.toLowerCase()));
    if (!this.listOfOption.length) {
      this.listOfOption.push({ value: event, text: event });
    }
  }
}
