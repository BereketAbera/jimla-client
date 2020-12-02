import { VoiceOrderListComponent } from './components/voice-order-list/voice-order-list.component';
import { ActiveOrderListComponent } from './components/active-order-list/active-order-list.component';
import { ProductsComponent } from './components/products/products.component';
import { MerchantComponent } from './merchant.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrderVoiceComponent } from '@app/merchant/components/create-order-voice/create-order-voice.component';
// import { OrderGroupListComponent } from '@app/merchant/components/order-group-list/order-group-list.component';
// import { OrderListComponent } from '@app/merchant/components/order-list/order-list.component';
import { GetOrderResolverService } from '@app/_resolvers/order/get-order-resolver.service';
import { OrderGroupListResolverService } from '@app/_resolvers/order/order-group-list-resolver.service';
// import { OrderListResolverService } from '@app/_resolvers/order/order-list-resolver.service';
import { CompanyProductsResolverService } from '@app/_resolvers/product/company-products-resolver.service';
import { ProfileComponent } from './components/profile/profile.component';
import { VoiceOrderGroupListResolverService } from '@app/_resolvers/order/voice-order-group-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: MerchantComponent,
    children: [
      {
        path: '',
        component: ActiveOrderListComponent,
        resolve: { data: OrderGroupListResolverService }
      },
      {
        path: 'pending_orders/create_order_voice/:id',
        component: CreateOrderVoiceComponent,
        resolve: { data: GetOrderResolverService }
      },
      {
        path: 'active_orders',
        component: ActiveOrderListComponent,
        resolve: { data: OrderGroupListResolverService }
      },
      {
        path: 'pending_orders',
        component: VoiceOrderListComponent,
        resolve: { data: VoiceOrderGroupListResolverService }
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
