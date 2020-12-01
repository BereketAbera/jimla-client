import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReturnStatement, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_services/product/product.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  // value = '';
  firstReload = true;

  type = 'product';
  q = '';
  subCategoryId;
  sort_by = 'createdAt';
  direction = 'DESC';

  nzFilterOption = () => true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.products = res.data[0].rows;
      this.categories = res.data[1].slice(0, 8);
    });

    this.route.queryParams.subscribe((res) => {
      this.type = res.type || 'product';
      this.q = res.q || '';
      this.subCategoryId = res.subCat || null;
      this.sort_by = res.sort_by || 'createdAt';
      this.direction = res.direction || 'DESC';
      if (!this.firstReload) {
        this.getProducts();
      } else {
        this.firstReload = false;
      }
    });
  }

  getProducts() {
    this.productService
      .getProducts({
        q: this.q,
        subCategoryId: this.subCategoryId,
        type: this.type,
        sort_by: this.sort_by,
        direction: this.direction
      })
      .subscribe((res) => {
        this.products = res.rows;
      });
  }

  search() {
    // if (!this.q) return;

    this.setUrlValues({ q: this.q, type: this.type });
  }

  sortChanged(event, type) {
    if (type == 'direction') {
      this.setUrlValues({ direction: event });
    } else {
      this.setUrlValues({ sort_by: event });
    }
  }

  subCategoryChanged(subCategory) {
    this.setUrlValues({ subCat: subCategory.id });
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
