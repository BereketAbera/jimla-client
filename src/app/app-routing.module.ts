import { CustomPreloadingService } from './_services/custom-preloading.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: { preload: true },
    loadChildren: () => import('./landing/landing.module').then((mod) => mod.LandingModule)
  }
  // {
  //   path: 'applicant',
  //   canActivate: [AuthGuard],
  //   data: { roles: [Role.applicant] },
  //   loadChildren: () => import('./applicant/applicant.module').then(mod => mod.ApplicantModule)
  // },
  // { path: '**', redirectTo: 'home', pathMatch: 'full' }
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
