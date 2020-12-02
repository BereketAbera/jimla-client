import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RetailerRoutingModule } from './retailer-routing.module';
import { RetailerComponent } from './retailer.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMessageModule } from 'ng-zorro-antd/message';
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
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveOrdersComponent } from './components/active-orders/active-orders.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProcessOrderComponent } from './components/process-order/process-order.component';
import { ProfileCompanyComponent } from './components/profile-company/profile-company.component';
import { ProfilePersonalComponent } from './components/profile-personal/profile-personal.component';
import { LocationsComponent } from './components/locations/locations.component';
import { AddLocationModalComponent } from './components/add-location-modal/add-location-modal.component';
import { ProfilePasswordComponent } from './components/profile-password/profile-password.component';

@NgModule({
  declarations: [
    RetailerComponent,
    NavigationComponent,
    NavigationComponent,
    DashboardComponent,
    ActiveOrdersComponent,
    OrderHistoryComponent,
    ProfileComponent,
    ProcessOrderComponent,
    ProfileCompanyComponent,
    ProfilePersonalComponent,
    ProcessOrderComponent,
    LocationsComponent,
    AddLocationModalComponent,
    ProfilePasswordComponent
  ],
  imports: [
    CommonModule,
    RetailerRoutingModule,
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
    NzSpinModule,
    NzMessageModule
  ]
})
export class RetailerModule {}
