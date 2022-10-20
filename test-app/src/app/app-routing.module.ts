import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from 'src/modules/account/account.component';
import { TextsComponent } from 'src/modules/texts/texts.component';
import { UsersComponent } from 'src/modules/users/users.component';
import { AppComponent } from './app.component';

const routes: Routes = [{
  path: 'typo',
  children: [
    {
      path: 'users',
      component: UsersComponent,
    }
  ]
},
{
  path: '',
  redirectTo: 'typo/users',
  pathMatch: 'full'
},
{
  path: 'typo/texts',
  children: [
    {
      path: '',
      component: TextsComponent,
    }
  ]
},
{
  path: 'typo/account',
  children: [
    {
      path: '',
      component: AccountComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
