import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTasklistComponent } from './admin-tasklist/admin-tasklist.component';
import { AdminAddtaskComponent } from './admin-addtask/admin-addtask.component';
import { AbousUsComponent } from './abous-us/abous-us.component';

const routes: Routes = [
  {path: 'main', component:AdminTasklistComponent},
  {path: 'admin_addTask', component:AdminAddtaskComponent},
  {path: 'about_us', component:AbousUsComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', redirectTo: 'main', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
