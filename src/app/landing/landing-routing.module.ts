import { HomeResolverService } from './../_resolvers/product/home-resolver.service';
import { HomeSecondComponent } from './components/home-second/home-second.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './landing.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { AuthGuard } from '@app/_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        resolve: { data: HomeResolverService },
        pathMatch: 'full'
      },
      {
        path: 'hometwo',
        component: HomeSecondComponent,
        pathMatch: 'full'
      },
      {
        path: 'login',
        canActivate: [AuthGuard],
        component: LoginComponent
      },
      {
        path: 'register',
        // canActivate: [AuthGuard],
        component: RegisterComponent
      },
      {
        path: 'server_error',
        component: ServerErrorComponent
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
