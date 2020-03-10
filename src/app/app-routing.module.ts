import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GuestComponent} from './components/guest/guest.component';
import {InnerGuard} from './core/guard/inner.guard';
import {UserComponent} from './components/user/user.component';
import {AuthGuard} from './core/guard/auth.guard';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AdminGuard} from './core/guard/admin.guard';


const routes: Routes = [
  {path: '', redirectTo: '/guest', pathMatch: 'full'},
  {path: 'guest', component: GuestComponent, canActivate: [InnerGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [InnerGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
