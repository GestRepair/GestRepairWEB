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
import { VehicleAddExistsComponent } from "app/vehicle/addExists/addExits.vehicle.component";
import { VehicleDisableComponent } from "app/vehicle/disable/disable.vehicle.component";
//service
import { VehicleService } from "app/vehicle/vehicle.service";

/**
 * Aqui é declarado os components e os services
 */

@NgModule({
    declarations: [
        VehicleCreateComponent,
        VehicleExistsComponent,
        VehicleListComponent,
        VehicleVerifyComponent,
        VehicleAddExistsComponent,
        VehicleDisableComponent
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
        VehicleVerifyComponent,
        VehicleAddExistsComponent,
        VehicleDisableComponent
    ],
    providers: [
        VehicleService
    ]
})
export class VehicleModule { }
