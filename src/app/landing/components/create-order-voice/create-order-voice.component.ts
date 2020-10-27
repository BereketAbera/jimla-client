import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-order-voice',
  templateUrl: './create-order-voice.component.html',
  styleUrls: ['./create-order-voice.component.scss']
})
export class CreateOrderVoiceComponent implements OnInit {
  selectedOrderGroup = null;
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
  selectedProducts = [];
  quantity = 1;

  constructor() {}

  ngOnInit(): void {}
}
