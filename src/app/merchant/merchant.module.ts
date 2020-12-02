import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantRoutingModule } from './merchant-routing.module';
import { MerchantComponent } from './merchant.component';
import { CreateOrderVoiceComponent } from './components/create-order-voice/create-order-voice.component';
import { OrderGroupListComponent } from './components/order-group-list/order-group-list.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ProductsComponent } from './components/products/products.component';
import { AddProductModalComponent } from './components/add-product-modal/add-product-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderDetailModalComponent } from './components/order-detail-modal/order-detail-modal.component';
import { SingleOrderDetailModalComponent } from './components/single-order-detail-modal/single-order-detail-modal.component';
import { ProfileCompanyComponent } from './components/profile-company/profile-company.component';
import { ProfilePasswordComponent } from './components/profile-password/profile-password.component';
import { ProfilePersonalComponent } from './components/profile-personal/profile-personal.component';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    MerchantComponent,
    CreateOrderVoiceComponent,
    OrderGroupListComponent,
    OrderListComponent,
    NavigationComponent,
    ProductsComponent,
    AddProductModalComponent,
    ProfileComponent,
    OrderDetailModalComponent,
    SingleOrderDetailModalComponent,
    ProfileCompanyComponent,
    ProfilePasswordComponent,
    ProfilePersonalComponent
  ],
  imports: [
    CommonModule,
    MerchantRoutingModule,
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
    NzSpaceModule,
    NzMessageModule

  ]
})
export class MerchantModule {}
