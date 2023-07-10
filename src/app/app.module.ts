import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

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
import { AbousUsComponent } from './abous-us/abous-us.component';
import { UserFooterComponent } from './user-footer/user-footer.component';
import { AboutUsUserComponent } from './about-us-user/about-us-user.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UserTasklistComponent,
    UserHeaderComponent,
    AdminTasklistComponent,
    AdminHeaderComponent,
    AdminToolsComponent,
    AdminAddtaskComponent,
    AdminFooterComponent,
    AbousUsComponent,
    UserFooterComponent,
    AboutUsUserComponent,
    LoginPageComponent
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
    MatFormFieldModule,
    AngularFireAuthModule,

    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAs-uZlk53De-jXqpagPcyS2CvCc4rgLPA",
      authDomain: "tasks-management-e19fd.firebaseapp.com",
      projectId: "tasks-management-e19fd",
      storageBucket: "tasks-management-e19fd.appspot.com",
      messagingSenderId: "1085180102537",
      appId: "1:1085180102537:web:1dee0c49e96c0970f34358",
      measurementId: "G-9BE7EKETD0"
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
