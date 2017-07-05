import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserEditComponent } from "app/user/edit/edit.component";
import { UserInfoComponent } from "app/user/info/info.component";
//service
import { AppService } from "app/app.service";
import { RegisterService } from './register/register.service';
import { UserEditService } from "app/user/edit/edit.service";
import { UserInfoService } from "app/user/info/info.service";
//module
import { AppRoutingModule } from "app/app.routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    UserEditComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AppService,
    RegisterService,
    UserEditService,
    UserInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
