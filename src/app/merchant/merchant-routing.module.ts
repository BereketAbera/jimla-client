import { ProfileComponent } from './../retailer/components/profile/profile.component';
import { ProductsComponent } from './components/products/products.component';
import { MerchantComponent } from './merchant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrderVoiceComponent } from '@app/merchant/components/create-order-voice/create-order-voice.component';
import { OrderGroupListComponent } from '@app/merchant/components/order-group-list/order-group-list.component';
import { OrderListComponent } from '@app/merchant/components/order-list/order-list.component';
import { GetOrderResolverService } from '@app/_resolvers/order/get-order-resolver.service';
import { OrderGroupListResolverService } from '@app/_resolvers/order/order-group-list-resolver.service';
import { OrderListResolverService } from '@app/_resolvers/order/order-list-resolver.service';
import { CompanyProductsResolverService } from '@app/_resolvers/product/company-products-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MerchantComponent,
    children: [
      {
        path: '',
        component: OrderGroupListComponent,
        resolve: { data: OrderGroupListResolverService }
      },
      {
        path: 'order_groups/create_order_voice/:id',
        component: CreateOrderVoiceComponent,
        resolve: { data: GetOrderResolverService }
      },
      {
        path: 'order_groups',
        component: OrderGroupListComponent,
        resolve: { data: OrderGroupListResolverService }
      },
      {
        path: 'orders',
        component: OrderListComponent,
        resolve: { data: OrderListResolverService }
      },
      {
        path: 'products',
        component: ProductsComponent,
        resolve: { data: CompanyProductsResolverService }
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {}
