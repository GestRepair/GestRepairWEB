import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { RepairListComponent } from "app/repair/list/list.repair.component";
//service
import { RepairService } from "app/repair/repair.service";
/**
 * Aqui é declarado os compunentes e serviços
 */
@NgModule({
    declarations: [
        RepairListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        RepairListComponent
    ],
    providers: [
        RepairService
    ]
})
export class RepairModule { }
