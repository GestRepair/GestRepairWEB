import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { AppComponent } from './app.component';
import { AuthComponent } from "app/auth/auth.component";
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
//service
import { RegisterService } from './register/register.service';
import { AuthService } from "app/auth/auth.service";
//module
import { AppRoutingModule } from "app/app.routing.module";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
