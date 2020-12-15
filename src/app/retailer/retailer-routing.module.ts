import { RetailerDashboardResolverService } from './../_resolvers/retailer-dashboard-resolver.service';
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
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { UserResolverService } from '@app/_resolvers/identity/user-resolver.service';
import { ProfileCompanyComponent } from './components/profile-company/profile-company.component';
import { ProfilePersonalComponent } from './components/profile-personal/profile-personal.component';
import { ConsumerResolverService } from '@app/_resolvers/identity/consumer-resolver.service';
import { AddressResolverService } from '@app/_resolvers/identity/address-resolver.service';
import { ProfilePasswordComponent } from './components/profile-password/profile-password.component';
import { UsersComponent } from './components/users/users.component';
import { StaffUsersResolverService } from '@app/_resolvers/identity/staff-users-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RetailerComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        resolve: { data: RetailerDashboardResolverService }
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
        component: ProfileComponent,

        children: [
          {
            path: '',
            component: ProfilePersonalComponent,
            resolve: { data: UserResolverService }
          },
          {
            path: 'company',
            component: ProfileCompanyComponent,
            resolve: { data: ConsumerResolverService }
          },
          {
            path: 'password',
            component: ProfilePasswordComponent,
            resolve: { data: ConsumerResolverService }
          }
        ]
      },
      {
        path: 'process_order',
        component: ProcessOrderComponent
      },
      {
        path: 'users',
        component: UsersComponent,
        resolve: { data: GetConsumerAddressResolverService,resData:StaffUsersResolverService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerRoutingModule {}
