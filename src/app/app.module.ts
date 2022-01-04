import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { BudgetSettingsComponent } from './budget-settings/budget-settings.component';
import { ExpectetExpansesComponent } from './expectet-expanses/expectet-expanses.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AdminComponent,
    UserComponent,
    LogoutComponent,
    CreateBudgetComponent,
    BudgetSettingsComponent,
    ExpectetExpansesComponent,
    RegisterUserComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
