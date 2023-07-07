import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTasklistComponent } from './admin-tasklist/admin-tasklist.component';
import { AdminAddtaskComponent } from './admin-addtask/admin-addtask.component';
import { AbousUsComponent } from './abous-us/abous-us.component';
import { UserTasklistComponent } from './user-tasklist/user-tasklist.component';
import { AboutUsUserComponent } from './about-us-user/about-us-user.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {path: 'main', component:AdminTasklistComponent},
  {path: 'login_page', component:LoginPageComponent },
  {path: 'admin_addTask', component:AdminAddtaskComponent},
  {path: 'about_us', component:AbousUsComponent},
  {path: 'about_us_user', component:AboutUsUserComponent},
  {path: 'user_main', component:UserTasklistComponent },
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', redirectTo: 'main', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
