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
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { ShortProductComponent } from './components/short-product/short-product.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { HomeSecondComponent } from './components/home-second/home-second.component';
import { CompanySmallComponent } from './components/company-small/company-small.component';
import { CompanyPageComponent } from './components/company-page/company-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductSmallComponent } from './components/product-small/product-small.component';
import { ProductSmallImageComponent } from './components/product-small-image/product-small-image.component';
import { ProductHomeComponent } from './components/product-home/product-home.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RetailerRegisterComponent } from './components/retailer-register/retailer-register.component';

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HeaderComponent,
    ShortProductComponent,
    ServerErrorComponent,
    LandingHomeComponent,
    HomeSecondComponent,
    CompanySmallComponent,
    CompanyPageComponent,
    FooterComponent,
    ProductSmallComponent,
    ProductSmallImageComponent,
    ProductHomeComponent,
    RetailerRegisterComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FormsModule,
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
    NzDropDownModule,
    NzDropDownModule,
    NzDatePickerModule,
    NzPopoverModule,
    NzEmptyModule,
    NzLayoutModule,
    NzSpaceModule
  ]
})
export class LandingModule {}
