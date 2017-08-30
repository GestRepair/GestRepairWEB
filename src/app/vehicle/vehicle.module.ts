import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { VehicleCreateComponent } from "app/vehicle/create/create.vehicle.component";
import { VehicleListComponent } from "app/vehicle/list/list.vehicle.component";
import { VehicleVerifyComponent } from "app/vehicle/verify/verify.vehicle.component";
import { VehicleExistsComponent } from "app/vehicle/exists/exists.vehicle.component";
//service
import { VehicleService } from "app/vehicle/vehicle.service";


@NgModule({
    declarations: [
        VehicleCreateComponent,
        VehicleExistsComponent,
        VehicleListComponent,
        VehicleVerifyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        VehicleCreateComponent,
        VehicleExistsComponent,
        VehicleListComponent,
        VehicleVerifyComponent
    ],
    providers: [
        VehicleService
    ]
})
export class VehicleModule { }
