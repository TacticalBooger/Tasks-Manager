import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTasklistComponent } from './user-tasklist/user-tasklist.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AdminTasklistComponent } from './admin-tasklist/admin-tasklist.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { AdminAddtaskComponent } from './admin-addtask/admin-addtask.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTasklistComponent,
    UserHeaderComponent,
    AdminTasklistComponent,
    AdminHeaderComponent,
    AdminToolsComponent,
    AdminAddtaskComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
