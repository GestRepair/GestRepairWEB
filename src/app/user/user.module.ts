import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//component
import { UserActivateComponent } from "app/user/activate/activate.user.component";
import { UserActiveEmailComponent } from "app/user/activateUser/active.email.user.component";
import { UserCreateComponent } from 'app/user/create/create.user.component';
import { UserEditComponent } from "app/user/edit/edit.user.component";
import { UserInfoComponent } from "app/user/info/info.user.component";
import { UserRecoveryComponent } from "app/user/recovery/recovery.user.component";
import { UserRecoveryEmailComponent } from "app/user/recoveryemail/recovery.email.user.component";
//service
import { UserService } from "app/user/user.service";

@NgModule({
    declarations: [
        UserActivateComponent,
        UserActiveEmailComponent,
        UserCreateComponent,
        UserEditComponent,
        UserInfoComponent,
        UserRecoveryComponent,
        UserRecoveryEmailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    exports: [
        UserActivateComponent,
        UserActiveEmailComponent,
        UserCreateComponent,
        UserEditComponent,
        UserInfoComponent,
        UserRecoveryComponent,
        UserRecoveryEmailComponent
    ],providers: [
        UserService
    ]
})
export class UserModule { }
