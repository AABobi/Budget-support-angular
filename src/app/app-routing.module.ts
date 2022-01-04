import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';
import {CreateBudgetComponent} from './create-budget/create-budget.component';
import { BudgetSettingsComponent } from './budget-settings/budget-settings.component';
import { ExpectetExpansesComponent } from './expectet-expanses/expectet-expanses.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AuthGuardService } from '../app/services/auth-guard.service';
import { AuthenticationService } from '../app/services/authentication.service';
import { Budget, HttpClientService, Permission, User, UserAssignmentToGroup} from '../app/services/http-client.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'LoginComponent', component: LoginComponent},
  {path: 'AdminComponent', component: AdminComponent},
  {path: 'UserComponent', component: UserComponent, canActivate: [AuthGuardService]},
  {path: 'LogoutComponent', component: LogoutComponent, canActivate: [AuthGuardService]},
  {path: 'CreateBudgetComponent', component: CreateBudgetComponent, canActivate: [AuthGuardService]},
  {path: 'BudgetSettingsComponent', component: BudgetSettingsComponent, canActivate: [AuthGuardService]},
  {path: 'ExpectetExpansesComponent', component: ExpectetExpansesComponent, canActivate: [AuthGuardService]},
  {path: 'RegisterUserComponent', component: RegisterUserComponent},
  {path: 'RegisterUserComponent/:code', component: RegisterUserComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
