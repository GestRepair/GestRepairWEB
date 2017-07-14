import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//Component
import { ServiceInfoComponent } from 'app/service/info/info.service.component';
//service
import { ServiceService } from "app/service/service.service";


@NgModule({
    declarations: [
        ServiceInfoComponent,
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        ServiceInfoComponent
    ],
    providers: [
        ServiceService
    ]
})
export class ServiceModule { }
