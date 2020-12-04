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
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilePersonalComponent } from './components/profile-personal/profile-personal.component';
import { UserResolverService } from '@app/_resolvers/identity/user-resolver.service';
import { ProfileCompanyComponent } from './components/profile-company/profile-company.component';
import { ProfilePasswordComponent } from './components/profile-password/profile-password.component';
import { ConsumerResolverService } from '@app/_resolvers/identity/consumer-resolver.service';
import { ProducerResolverService } from '@app/_resolvers/identity/producer-resolver.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: MerchantComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        // resolve: { data: OrderGroupListResolverService }
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
        component: ProfileComponent,
       
        children: [
          {
            path: '',
            component: ProfilePersonalComponent,
            resolve: { data: UserResolverService },
          },
          {
            path: 'company',
            component: ProfileCompanyComponent,
            resolve: { data: ProducerResolverService },
          },
          {
            path: 'password',
            component: ProfilePasswordComponent,
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantRoutingModule {}
