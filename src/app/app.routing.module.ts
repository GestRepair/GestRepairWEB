import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserCreateComponent } from "app/user/create/create.user.component";
import { UserEditComponent } from "app/user/edit/edit.user.component";
import { UserInfoComponent } from "app/user/info/info.user.component";
import { VehicleListComponent } from "app/user/vehicle/list/list.vehicle.component";


const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'user', redirectTo: '/user/info', pathMatch: 'full' },
	{ path: 'user/vehicle', redirectTo: '/user/vehicle/list', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
	{ path: 'user/create', component: UserCreateComponent },
	{ path: 'user/edit', component: UserEditComponent },
	{ path: 'user/info', component: UserInfoComponent },
	{ path: 'user/vehicle/list', component: VehicleListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
