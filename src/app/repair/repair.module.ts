import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { RepairListComponent } from "app/repair/list/list.repair.component";
import { RepairInfoComponent } from "app/repair/info/info.repair.component";
//service
import { RepairService } from "app/repair/repair.service";

@NgModule({
    declarations: [
        RepairListComponent,
        RepairInfoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        RepairListComponent,
        RepairInfoComponent
    ],
    providers: [
        RepairService
    ]
})
export class RepairModule { }
