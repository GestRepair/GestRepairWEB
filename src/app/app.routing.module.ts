import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import { AppComponent } from './app.component';
import { BudgetInfoComponent } from "app/budget/info/info.budget.component";
import { BudgetListComponent } from "app/budget/list/list.budget.component";
import { HomeComponent } from './home/home.component';
import { NavbarComponent} from 'app/navbar/navbar.component';
import { RepairInfoComponent } from "app/repair/info/info.repair.component";
import { RepairListComponent } from "app/repair/list/list.repair.component";
import { ScheduleCreateComponent } from 'app/schedule/create/create.schedule.component';
import { ScheduleDisableComponent } from 'app/schedule/disable/disable.schedule.component';
import { ScheduleInfoComponent } from 'app/schedule/info/info.schedule.component';
import { ScheduleListComponent } from 'app/schedule/list/list.schedule.component';
import { ServiceInfoComponent } from 'app/service/info/info.service.component';
import { UserActivateComponent } from "app/user/activate/activate.user.component";
import { UserActiveEmailComponent } from "app/user/activateUser/active.email.user.component";
import { UserChangePassComponent } from "app/user/changePassword/changePassword.user.component";
import { UserCreateComponent } from "app/user/create/create.user.component";
import { UserEditComponent } from "app/user/edit/edit.user.component";
import { UserInfoComponent } from "app/user/info/info.user.component";
import { UserRecoveryComponent } from "app/user/recovery/recovery.user.component";
import { UserRecoveryEmailComponent } from "app/user/recoveryemail/recovery.email.user.component";
import { VehicleCreateComponent } from "app/vehicle/create/create.vehicle.component";
import { VehicleListComponent } from "app/vehicle/list/list.vehicle.component";
import { VehicleInfoComponent } from "app/vehicle/info/info.vehicle.component";

const routes: Routes = [
	{ path: 'home', redirectTo: '', pathMatch: 'full' },
	{ path: 'budget/list', redirectTo: 'budget', pathMatch: 'full' },
	{ path: 'user/info', redirectTo: 'user', pathMatch: 'full' },
	{ path: 'repair/list', redirectTo: 'repair', pathMatch: 'full' },
	{ path: 'schedule/list', redirectTo: 'schedule', pathMatch: 'full' },
	{ path: 'vehicle/list', redirectTo: 'vehicle', pathMatch: 'full' },
	{ path: '', component: HomeComponent },
	{ path: 'budget', component: BudgetListComponent },
	{ path: 'budget/:id', component: BudgetInfoComponent },
	{ path: 'repair', component: RepairListComponent },
	{ path: 'repair/:id', component: RepairInfoComponent },
	{ path: 'schedule/create', component: ScheduleCreateComponent },
	{ path: 'schedule', component: ScheduleListComponent },
	{ path: 'schedule/disable/:id', component: ScheduleDisableComponent },
	{ path: 'schedule/:id', component: ScheduleInfoComponent },
	{ path: 'service/:id', component: ServiceInfoComponent },
	{ path: 'user/activated', component: UserActivateComponent },
	{ path: 'user/activated/:email/:token', component: UserActiveEmailComponent },
	{ path: 'user/changepass', component: UserChangePassComponent },
	{ path: 'user/create', component: UserCreateComponent },
	{ path: 'user/edit', component: UserEditComponent },
	{ path: 'user/recovery', component: UserRecoveryComponent },
	{ path: 'user/recovery/:email/:token', component: UserRecoveryEmailComponent },
	{ path: 'user', component: UserInfoComponent },
	{ path: 'vehicle', component: VehicleListComponent },
	{ path: 'vehicle/create', component: VehicleCreateComponent },
	{ path: 'vehicle/:id', component: VehicleInfoComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
