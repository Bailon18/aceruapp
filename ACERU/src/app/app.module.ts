import { NgModule, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DialogComponent } from './shared/components/dialog/dialog/dialog.component';
import { CodeWindowComponent } from './shared/components/code-window/code-window.component';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ProblemaInterceptorService } from './modules/problems/interceptores/problema-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    DialogComponent,
    CodeWindowComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),

  ],
  providers: [ProblemaInterceptorService],
  bootstrap: [AppComponent]
})
export class AppModule {



 }
