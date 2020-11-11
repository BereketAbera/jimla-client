import { CompanyProductResolverService } from './../_resolvers/product/company-product-resolver.service';
import { HomeSecondComponent } from './components/home-second/home-second.component';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderListResolverService } from './../_resolvers/order/order-list-resolver.service';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { OrderGroupListResolverService } from './../_resolvers/order/order-group-list-resolver.service';
import { OrderGroupListComponent } from './components/order-group-list/order-group-list.component';
import { GetOrderResolverService } from './../_resolvers/order/get-order-resolver.service';
import { CreateOrderVoiceComponent } from './components/create-order-voice/create-order-voice.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './landing.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'hometwo',
        component: HomeSecondComponent,
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'server_error',
        component: ServerErrorComponent
      },
      {
        path: 'orders/create_order_voice/:id',
        component: CreateOrderVoiceComponent,
        resolve: { data: GetOrderResolverService }
      },
      {
        path: 'orders/order_groups',
        component: OrderGroupListComponent,
        resolve: { data: OrderGroupListResolverService }
      },
      // {
      //   path: '**',
      //   component: LandingHomeComponent
      // },
      {
        path: 'orders/orders',
        component: OrderListComponent,
        resolve: { data: OrderListResolverService }
      },
      {
        path: 'company_page/:company_name',
        component: CompanyPageComponent,
        resolve: { data: CompanyProductResolverService }
      },
      {
        path: '**',
        component: LandingHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {}
