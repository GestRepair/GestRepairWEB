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
    altera: string;
    constructor(
        private route: ActivatedRoute,
        private nrouter: Router,
        private _User: UserService) { }

    changePassword(model: ChangePassword, isValid: boolean) {
        if (isValid) {
            if (model.oldPassword == JSON.parse(localStorage.getItem('currentUser')).password) {
                if (model.oldPassword != model.newPassword) {
                    this.route.params
                        .switchMap((params: Params) => this._User.changePass(model, JSON.parse(localStorage.getItem('currentUser')).idUser))
                        .subscribe(
                        data => {
                            this.altera = data;
                            let myContainer = <HTMLElement>document.querySelector("#notif");
                            myContainer.innerHTML = '<div class="alert alert-success"><strong>Password</strong> Alterada com Sucesso</div>';
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
                } else {
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-danger"><strong>A nova Password</strong> é Igual à antiga</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                }
            }else{
                let myContainer = <HTMLElement>document.querySelector("#notif");
                myContainer.innerHTML = '<div class="alert alert-danger"><strong>A antiga Password</strong> é Invalida</div>';
                setTimeout(() => { myContainer.innerHTML = '' }, 3000)
            }
        }
    }
}
