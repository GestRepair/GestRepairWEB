import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ChangePassword } from './changePassword'
import { User } from '../user';
import { UserService } from "app/user/user.service";

@Component({
    templateUrl: './changePassword.user.component.html',
    styleUrls: ['./changePassword.user.component.css']
})

export class UserChangePassComponent {
    title = 'Alterar password';
    on = 0;
    non = 0;
    verif = false;
    pass: string;
    old: string;
    new: string;
    confirm: string;
    bold = false;
    bnou = false;
    bncf = false;
    constructor(
        private route: ActivatedRoute,
        private nrouter: Router,
        private _User: UserService) { }
    verifequal() {
        if (this.old == JSON.parse(localStorage.getItem('currentUser')).password) {
            this.bold = true;
        } else {
            this.bold = false
        };
        this.on = 1;
    }
    verifypass() {
        if (this.old != this.new) {
            this.bnou = true;
        } else {
            this.bnou = false
        };
        if (this.new == this.confirm) {
            this.bncf = true;
        } else {
            this.bncf = false
        };
        this.non = 1;
        this.verif = (this.bold == true) ? ((this.bnou == true) ? ((this.bncf == true) ? true : false) : false) : false;
    }
    changePassword(isValid: boolean) {
        if (isValid) {
            let myContainer = <HTMLElement>document.querySelector("#notif");
            if (this.verif == true) {
                this.route.params
                    .switchMap((params: Params) => this._User.changePass(this.new, this.old, JSON.parse(localStorage.getItem('currentUser')).idUser))
                    .subscribe(
                    data => {
                        this.pass = data;
                        let myContainer = <HTMLElement>document.querySelector("#notif");
                        myContainer.innerHTML = '<div class="alert alert-success"><strong>Password</strong> Alterada com Sucesso. Terá de fazer login novamente.</div>';
                        setTimeout(() => { location.reload(); localStorage.removeItem('currentUser'); }, 1000)
                        this.nrouter.navigate(['home']);
                    },
                    error => {
                        myContainer.innerHTML = '<div class="alert alert-warning">' + error + '</div>';
                        this.nrouter.navigate(['home']);
                    }
                    );
            } else {
                myContainer.innerHTML = '<div class="alert alert-danger"><strong>Verifique</strong> os dados</div>';
            }
            setTimeout(() => { myContainer.innerHTML = '' }, 3000)
        }
    }
}
