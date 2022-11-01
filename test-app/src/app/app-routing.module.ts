import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'typo/users',
    pathMatch: 'full'
  },
  {
    path: 'typo/login',
    component: LoginComponent
  },
  {
    path: 'typo/main',
    component: AppComponent
  },
  {
    path: 'typo/registration',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // , { onSameUrlNavigation: 'reload' }
  exports: [RouterModule]
})
export class AppRoutingModule { }
