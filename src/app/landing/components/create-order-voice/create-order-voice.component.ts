import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order-voice',
  templateUrl: './create-order-voice.component.html',
  styleUrls: ['./create-order-voice.component.scss']
})
export class CreateOrderVoiceComponent implements OnInit {
  selectedOrderGroup = null;
  selectedProduct = null;
  quantity = null;
  isVisible = false;

  // setOfCheckedId = new Set<number>();
  // checked = false;
  // loading = false;
  // indeterminate = false;

  products = [
    {
      id: 2,
      name: 'Handmade Cotton Bacon',
      MerchantId: 1
    },
    {
      id: 18,
      name: 'Small Metal Chips',
      MerchantId: 1
    },
    {
      id: 21,
      name: 'Nigus',
      MerchantId: 1
    },
    {
      id: 22,
      name: 'Nigus',
      MerchantId: 1
    }
  ];
  selectedProducts = [
    {
      id: 2,
      name: 'Handmade Cotton Bacon',
      quantity: 12
    }
  ];

  selectedProductsOrders = [];

  constructor() {}

  ngOnInit(): void {}

  handleAdd(): void {
    if (!this.selectedProduct) return;
    let product;
    this.products.map((p) => {
      if (p.name == this.selectedProduct) {
        product = p;
      }
    });
    if (product && this.quantity >= 1) {
      this.selectedProducts.push({ ...product, quantity: this.quantity });
      this.selectedProduct = null;
      this.quantity = null;
      this.isVisible = false;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }

  deleteProduct(product): void {
    this.selectedProducts = this.selectedProducts.filter((p) => !p.id == product.id);
  }

  editProduct(product): void {
    console.log(product);
    this.quantity = product.quantity;
    this.selectedProduct = product;
    this.showModal();
  }
  // updateCheckedSet(id: number, checked: boolean): void {
  //   if (checked) {
  //     this.setOfCheckedId.add(id);
  //   } else {
  //     this.setOfCheckedId.delete(id);
  //   }
  // }
  // refreshCheckedStatus(): void {
  //   const listOfEnabledData = this.products.filter(({ disabled }) => !disabled);
  //   this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
  //   this.indeterminate =
  //     listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  // }

  // onItemChecked(id: number, checked: boolean): void {
  //   // console.log(id);
  //   this.updateCheckedSet(id, checked);
  //   this.refreshCheckedStatus();
  // }

  // onAllChecked(checked: boolean): void {
  //   this.products
  //     .filter(({ disabled }) => !disabled)
  //     .forEach(({ id }) => this.updateCheckedSet(id, checked));
  //   this.refreshCheckedStatus();
  // }
}
