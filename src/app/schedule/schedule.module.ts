import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//Component
import { ScheduleCreateComponent } from 'app/schedule/create/create.schedule.component';
//service
import { ScheduleService } from "app/schedule/schedule.service";

@NgModule({
    declarations: [
        ScheduleCreateComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        ScheduleCreateComponent
    ],
    providers: [
        ScheduleService
    ]
})
export class ScheduleModule { }
