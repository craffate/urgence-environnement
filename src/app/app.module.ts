import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { AppRoutingModule } from './app-routing.module';

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GlobalErrorHandler } from './classes/global-error-handler';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    Title,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    AuthService,
    CookieService
  ]
})
export class AppModule { }
