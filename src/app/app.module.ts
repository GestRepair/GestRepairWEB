import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserCreateComponent } from 'app/user/create/create.user.component';
import { UserEditComponent } from "app/user/edit/edit.user.component";
import { UserInfoComponent } from "app/user/info/info.user.component";
import { VehicleListComponent } from "app/user/vehicle/list/list.vehicle.component";
import { VehicleInfoComponent } from "app/user/vehicle/info/info.vehicle.component";
//service
import { AppService } from "app/app.service";
import { UserCreateService } from 'app/user/create/create.user.service';
import { UserEditService } from "app/user/edit/edit.user.service";
import { UserInfoService } from "app/user/info/info.user.service";
import { VehicleListService } from "app/user/vehicle/list/list.vehicle.service";
import { VehicleInfoService } from "app/user/vehicle/info/info.vehicle.service";
//module
import { AppRoutingModule } from "app/app.routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserCreateComponent,
    UserEditComponent,
	UserInfoComponent,
	VehicleListComponent,
	VehicleInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AppService,
    UserCreateService,
    UserEditService,
	UserInfoService,
	VehicleListService,
	VehicleInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
