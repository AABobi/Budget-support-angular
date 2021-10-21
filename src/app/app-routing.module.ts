import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { UserComponent } from './user/user.component';
import {CreateBudgetComponent} from './create-budget/create-budget.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'LoginComponent', component: LoginComponent},
  {path: 'AdminComponent', component: AdminComponent},
  {path: 'UserComponent', component: UserComponent},
  {path: 'LogoutComponent', component: LogoutComponent},
  {path: 'CreateBudgetComponent', component: CreateBudgetComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
