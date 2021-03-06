import { AdminMessagesResolverService } from './../_resolvers/admin/admin-messages-resolver.service';
import { DepositResolverService } from './../_resolvers/admin/deposit-resolver.service';
import { DepositsComponent } from './components/deposits/deposits.component';
import { OrdersResolverService } from './../_resolvers/admin/orders-resolver.service';
import { OrdersComponent } from './components/orders/orders.component';
import { CategoriesResolverService } from './../_resolvers/categories-resolver.service';
import { ProductsResolverService } from './../_resolvers/admin/products-resolver.service';
import { RetailersResolverService } from './../_resolvers/admin/retailers-resolver.service';
import { RetailersComponent } from './components/retailers/retailers.component';
import { MerchantsResolverService } from './../_resolvers/admin/merchants-resolver.service';
import { MerchantsComponent } from './components/merchants/merchants.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { GetConsumerCategoriesResolverService } from '@app/_resolvers/identity/get-consumer-categories-resolver.service';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'merchants',
        component: MerchantsComponent,
        resolve: { data: MerchantsResolverService }
      },
      {
        path: 'retailers',
        component: RetailersComponent,
        resolve: { data: RetailersResolverService }
      },
      {
        path: 'products',
        component: ProductsComponent,
        resolve: { data: ProductsResolverService, categories: CategoriesResolverService }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        resolve: { data: OrdersResolverService }
      },
      {
        path: 'deposits',
        component: DepositsComponent,
        resolve: { data: DepositResolverService }
      },
      {
        path: 'batch_messages',
        component: MessagesComponent,
        resolve: { data: AdminMessagesResolverService }
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        resolve: { data: CategoriesResolverService, consData: GetConsumerCategoriesResolverService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
