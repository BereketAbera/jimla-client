import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingComponent } from './landing.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      { 
        path: '',
        component: HomeComponent,
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
        path: '**', 
        component: NotFoundComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
