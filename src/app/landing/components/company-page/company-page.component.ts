import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {
  selectedValue = '';
  listOfOption = [{ value: 'hello', text: 'Hello' }];
  dataFromServer = [
    { value: 'bek', text: 'Bek' },
    { value: 'silas', text: 'Silas' },
    { value: 'kaleb', text: 'Kaleb' },
    { value: 'tilahun', text: 'Tilahun' }
  ];
  searchPlaceHolder = 'Search supplier code, name, product';
  merchant;
  products;
  merchantCode;

  isVisibleTop = false;
  cartProducts = [];
  nzFilterOption = () => true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { data: { products: any; merchant: any; merchantCode } }) => {
      console.log(data);
      this.merchant = data.data.merchant;
      this.products = data.data.products.rows;
      this.merchantCode = data.data.merchantCode;
      console.log(this.merchantCode);
    });
  }

  search(event) {
    this.listOfOption = this.dataFromServer.filter((d) => d.value.includes(event.toLowerCase()));
    if (!this.listOfOption.length) {
      this.listOfOption.push({ value: event, text: event });
    }
  }

  showModalTop(): void {
    this.isVisibleTop = true;
  }

  handleOkTop(): void {
    console.log('点击了确定');
    this.isVisibleTop = false;
  }

  handleCancelTop(): void {
    this.isVisibleTop = false;
  }
}
