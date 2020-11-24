import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReturnStatement, ThrowStmt } from '@angular/compiler';
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
  dataFromServer = [];
  searchPlaceHolder = 'Search supplier code, name, product';
  products = [];
  categories = [];
  value = '';
  firstReload = true;

  nzFilterOption = () => true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.products = res.data[0].rows;
      this.categories = res.data[1];
    });

    this.route.queryParams.subscribe((res) => {
      // this.value = res['q'] || '';
      if (!this.firstReload) {
        this.getProducts();
      } else {
        this.firstReload = false;
      }
    });
  }

  getProducts() {
    this.productService.getProducts({ q: this.value }).subscribe((res) => {
      this.products = res.rows;
    });
  }

  search() {
    if (!this.value) return;

    this.setUrlValues({ q: this.value });
  }

  setUrlValues(sObj) {
    let keys = Object.keys(sObj);
    let pObj = {};
    keys.map((key) => {
      pObj[key] = sObj[key];
    });
    const queryParams: Params = {
      ...pObj
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }
}
