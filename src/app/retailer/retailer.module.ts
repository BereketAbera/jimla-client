import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerRoutingModule } from './retailer-routing.module';
import { RetailerComponent } from './retailer.component';


@NgModule({
  declarations: [RetailerComponent],
  imports: [
    CommonModule,
    RetailerRoutingModule
  ]
})
export class RetailerModule { }
