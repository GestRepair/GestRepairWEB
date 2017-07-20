import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { User } from '../user';
import { UserService } from "app/user/user.service";

@Component({
    templateUrl: './recovery.email.user.component.html',
    styleUrls: ['./recovery.email.user.component.css']
})

export class UserRecoveryEmailComponent {
    title = 'Recuperação de password';
    recov: string;
    constructor(
        private route: ActivatedRoute,
        private nrouter: Router, 
        private _User: UserService) { }

    recovery(model: User, isValid: boolean) {
        if (isValid) {
            this.route.params
                .switchMap((params: Params) => this._User.recemail(model, params['email'], params['token']))
                .subscribe(
                activ => {
                    this.recov = activ;
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-success"><strong>Conta</strong> Ativada com Sucesso</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                    this.nrouter.navigate(['home']);
                },
                error => {
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-warning">' + error + '</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                    this.nrouter.navigate(['home']);
                }
                );
        }
    }
}
