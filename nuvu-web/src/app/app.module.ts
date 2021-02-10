import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {ClientComponent} from './modules/client/components/client/client.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { CreateClientComponent } from './modules/client/components/create-client/create-client.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import { LoginComponent } from './modules/login/components/login/login.component';
import {AuthInterceptorService} from './share/auth-interceptor.service';
import { LoginDialogComponent } from './modules/login/components/login-dialog/login-dialog.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ClientDialogComponent } from './modules/client/components/client-dialog/client-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    CreateClientComponent,
    LoginComponent,
    LoginDialogComponent,
    ClientDialogComponent
  ],
  imports: [
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
