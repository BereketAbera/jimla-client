import { GetConsumerAddressResolverService } from './../_resolvers/location/get-consumer-address-resolver.service';
import { LocationsComponent } from './components/locations/locations.component';
import { RetailerOrderListResolverService } from './../_resolvers/order/retailer-order-list-resolver.service';
import { ProcessOrderComponent } from './components/process-order/process-order.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ActiveOrdersComponent } from './components/active-orders/active-orders.component';
import { RetailerComponent } from './retailer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyProductResolverService } from '@app/_resolvers/product/company-product-resolver.service';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

const routes: Routes = [
  {
    path: '',
    component: RetailerComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
        // resolve: { data: CompanyProductResolverService }
      },
      {
        path: 'company_page/:company_name',
        component: CompanyPageComponent
      },
      {
        path: 'orders',
        component: ActiveOrdersComponent,
        resolve: { data: RetailerOrderListResolverService }
      },
      {
        path: 'history',
        component: OrderHistoryComponent
      },
      {
        path: 'location',
        component: LocationsComponent,
        resolve: { data: GetConsumerAddressResolverService }
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'process_order',
        component: ProcessOrderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerRoutingModule {}
