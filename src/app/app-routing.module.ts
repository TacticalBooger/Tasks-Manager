import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTasklistComponent } from './admin-tasklist/admin-tasklist.component';
import { AdminAddtaskComponent } from './admin-addtask/admin-addtask.component';
import { AbousUsComponent } from './abous-us/abous-us.component';
import { UserTasklistComponent } from './user-tasklist/user-tasklist.component';
import { AboutUsUserComponent } from './about-us-user/about-us-user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './authguard.guard';

const routes: Routes = [
  { path: 'login_page', component: LoginPageComponent },
  { path: 'main', component: AdminTasklistComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'admin_addTask', component: AdminAddtaskComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'about_us', component: AbousUsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  { path: 'about_us_user', component: AboutUsUserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'user_main', component: UserTasklistComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: '', redirectTo: 'login_page', pathMatch: 'full' },
  { path: '**', redirectTo: 'login_page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
