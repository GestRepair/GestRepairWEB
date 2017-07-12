import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServiceInfoComponent } from 'app/service/info/info.service.component';
import { UserCreateComponent } from 'app/user/create/create.user.component';
import { UserEditComponent } from "app/user/edit/edit.user.component";
import { UserInfoComponent } from "app/user/info/info.user.component";
import { VehicleListComponent } from "app/vehicle/list/list.vehicle.component";
import { VehicleInfoComponent } from "app/vehicle/info/info.vehicle.component";
//service
import { AppService } from "app/app.service";
import { ServiceService } from "app/service/service.service";
import { UserService } from "app/user/user.service";
import { VehicleService } from "app/vehicle/vehicle.service";
//module
import { AppRoutingModule } from "app/app.routing.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServiceInfoComponent,
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
    ServiceService,
    UserService,
    VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
