import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { User } from '../user';
import { UserService } from "app/user/user.service";
declare var $;
@Component({
    templateUrl: './recovery.user.component.html',
    styleUrls: ['./recovery.user.component.css']
})

export class UserRecoveryComponent {
    title = 'Recuperação de password';
    email: string;
    constructor(
        private _user: UserService,
        private router: Router) { 
            $("#myModal").modal("hide");
        }
    /**
     * Envia um e-mail para a recuperação de password
     * @param model 
     * @param isValid 
     */
    recovery(model: User, isValid: boolean) {
        // check if model is valid
        if (isValid) {
            this._user.rec(model.email).subscribe(
                data => {
                    this.email = data
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-success">Verifique o seu e-mail</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                },
                error => {
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                });
        }
    }

}
