import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';

import {  } from '@angular/material'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MainComponent } from './components/main/main.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatToolbar, MatToolbarModule, MatToolbarRow } from '@angular/material/toolbar';
import { LeaderListComponent } from './components/leader-list/leader-list.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { AccountComponent } from './components/account/account.component';
import { UploadAvatarComponent } from './components/upload-avatar/upload-avatar.component';
import { BioComponent } from './components/bio/bio.component';
import { DescriptionComponent } from './components/description/description.component';
import { GenderPipe } from './pipes/gender.pipe';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { DividerComponent } from './components/divider/divider.component';
import { ChartComponent } from './components/chart/chart.component';
import { SocialsComponent } from './components/socials/socials.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { Chart } from 'chart.js'








@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    LeaderboardComponent,
    LeaderListComponent,
    MainHeaderComponent,
    MainFooterComponent,
    AccountComponent,
    UploadAvatarComponent,
    BioComponent,
    DescriptionComponent,
    GenderPipe,
    ChangepasswordComponent,
    DividerComponent,
    ChartComponent,
    SocialsComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    // ChartChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],

  exports: [
    MatFormFieldModule,
    MatPaginatorModule,
    GenderPipe,
    
  ]
})
export class AppModule { }


   
