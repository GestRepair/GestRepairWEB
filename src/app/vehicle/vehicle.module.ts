import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { VehicleCreateComponent } from "app/vehicle/create/create.vehicle.component";
import { VehicleListComponent } from "app/vehicle/list/list.vehicle.component";
import { VehicleInfoComponent } from "app/vehicle/info/info.vehicle.component";
//service
import { VehicleService } from "app/vehicle/vehicle.service";



@NgModule({
    declarations: [
        VehicleCreateComponent,
        VehicleListComponent,
        VehicleInfoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        VehicleCreateComponent,
        VehicleListComponent,
        VehicleInfoComponent
    ],
    providers: [
        VehicleService
    ]
})
export class VehicleModule { }
