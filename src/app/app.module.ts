import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserTasklistComponent } from './user-tasklist/user-tasklist.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AdminTasklistComponent } from './admin-tasklist/admin-tasklist.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { AdminAddtaskComponent } from './admin-addtask/admin-addtask.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTasklistComponent,
    UserHeaderComponent,
    AdminTasklistComponent,
    AdminHeaderComponent,
    AdminToolsComponent,
    AdminAddtaskComponent,
    AdminFooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
