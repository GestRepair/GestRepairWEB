import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//Component
import { ScheduleCreateComponent } from 'app/schedule/create/create.schedule.component';
import { ScheduleDisableComponent } from 'app/schedule/disable/disable.schedule.component';
import { ScheduleListComponent } from 'app/schedule/list/list.schedule.component';
//service
import { ScheduleService } from "app/schedule/schedule.service";

@NgModule({
    declarations: [
        ScheduleCreateComponent,
        ScheduleDisableComponent,
        ScheduleListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        ScheduleCreateComponent,
        ScheduleDisableComponent,
        ScheduleListComponent
    ],
    providers: [
        ScheduleService
    ]
})
export class ScheduleModule { }
