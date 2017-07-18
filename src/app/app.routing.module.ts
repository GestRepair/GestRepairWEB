﻿import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent} from 'app/navbar/navbar.component';
import { ScheduleCreateComponent } from 'app/schedule/create/create.schedule.component';
import { ScheduleInfoComponent } from 'app/schedule/info/info.schedule.component';
import { ScheduleListComponent } from 'app/schedule/list/list.schedule.component';
import { ServiceInfoComponent } from 'app/service/info/info.service.component';
import { UserCreateComponent } from "app/user/create/create.user.component";
import { UserEditComponent } from "app/user/edit/edit.user.component";
import { UserInfoComponent } from "app/user/info/info.user.component";
import { VehicleListComponent } from "app/vehicle/list/list.vehicle.component";
import { VehicleInfoComponent } from "app/vehicle/info/info.vehicle.component";


const routes: Routes = [
	{ path: 'home', redirectTo: '', pathMatch: 'full' },
	{ path: 'user/info', redirectTo: 'user', pathMatch: 'full' },
	{ path: 'vehicle/list', redirectTo: 'vehicle', pathMatch: 'full' },
	{ path: 'schedule/list', redirectTo: 'schedule', pathMatch: 'full' },
	{ path: '', component: HomeComponent },
	{ path: 'schedule', component: ScheduleListComponent },
	{ path: 'schedule/:id', component: ScheduleInfoComponent },
	{ path: 'schedule/create', component: ScheduleCreateComponent },
	{ path: 'service/:id', component: ServiceInfoComponent },
	{ path: 'user/create', component: UserCreateComponent },
	{ path: 'user/edit', component: UserEditComponent },
	{ path: 'user', component: UserInfoComponent },
	{ path: 'vehicle', component: VehicleListComponent },
	{ path: 'vehicle/:id', component: VehicleInfoComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
