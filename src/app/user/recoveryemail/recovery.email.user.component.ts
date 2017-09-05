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
    e = 0;
    eq = false;
    pass: string;
    conf: string;
    constructor(
        private route: ActivatedRoute,
        private nrouter: Router,
        private _User: UserService) { }
    verifypass() {
        this.e = 1;
        if (this.pass == this.conf)
        { this.eq = true; }
        else
        { this.eq = false };
    }
    recovery() {
        if (this.eq == true) {
            this.route.params
                .switchMap((params: Params) => this._User.recemail(this.pass, params['email'], params['token']))
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
