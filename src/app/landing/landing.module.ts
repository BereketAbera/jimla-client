import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateOrderVoiceComponent } from './components/create-order-voice/create-order-voice.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { OrderGroupListComponent } from './components/order-group-list/order-group-list.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzResultModule } from 'ng-zorro-antd/result';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { ShortProductComponent } from './components/short-product/short-product.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { HomeSecondComponent } from './components/home-second/home-second.component';
@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HeaderComponent,
    CreateOrderVoiceComponent,
    ShortProductComponent,
    OrderGroupListComponent,
    ServerErrorComponent,
    OrderListComponent,
    CompanyHomeComponent,
    LandingHomeComponent,
    HomeSecondComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LandingRoutingModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzGridModule,
    NzDividerModule,
    NzSelectModule,
    NzIconModule,
    NzTypographyModule,
    NzTableModule,
    NzInputNumberModule,
    NzModalModule,
    NzNotificationModule,
    NzPaginationModule,
    NzResultModule,
    NzInputModule,
    NzFormModule,
    NzCardModule,
    NzListModule,
    NzBadgeModule,
    NzAvatarModule,
    NzDropDownModule
  ]
})
export class LandingModule {}
