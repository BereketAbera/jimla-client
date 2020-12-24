import { CustomPreloadingService } from './_services/custom-preloading.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: 'landing',
    data: { preload: true },
    canActivate: [AuthGuard],
    loadChildren: () => import('./landing/landing.module').then((mod) => mod.LandingModule)
  },
  {
    path: 'merchant',
    canActivate: [AuthGuard],
    data: { roles: ['PRODUCER'] },
    loadChildren: () => import('./merchant/merchant.module').then((mod) => mod.MerchantModule)
  },
  {
    path: 'retailer',
    canActivate: [AuthGuard],
    data: { roles: ['CONSUMER','CONSSTAFF'] },
    loadChildren: () => import('./retailer/retailer.module').then((mod) => mod.RetailerModule)
  },
  {
    path: 'jm-admin',
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] },
    loadChildren: () => import('./admin/admin.module').then((mod) => mod.AdminModule)
  },
  { path: '**', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingService,
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
