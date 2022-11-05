import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LoginComponent } from './components/login/login/login.component';
import { MainComponent } from './components/main/main.component';
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
    path: 'typo/registration',
    component: RegisterComponent
  },
  {
    path: 'typo/leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'typo/main',
    component: MainComponent
  },
  {
    path: 'typo/account',
    component: AccountComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // , { onSameUrlNavigation: 'reload' }
  exports: [RouterModule]
})
export class AppRoutingModule { }
