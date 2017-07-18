import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from 'app/navbar/navbar.component';
//service
import { AppService } from "app/app.service";
//module
import { DatepickerModule } from 'ngx-bootstrap';
import { AppRoutingModule } from "app/app.routing.module";
import { RepairModule } from "app/repair/repair.module";
import { ScheduleModule} from "app/schedule/schedule.module";
import { ServiceModule } from "app/service/service.module";
import { UserModule } from "app/user/user.module";
import { VehicleModule } from "app/vehicle/vehicle.module";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    DatepickerModule.forRoot(),
    //Module We Create
    AppRoutingModule,
    RepairModule,
    ScheduleModule,
    ServiceModule,
    UserModule,
    VehicleModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
