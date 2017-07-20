import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../user.service';

import { User } from '../user';

@Component({
    templateUrl: './create.user.component.html',
    styleUrls: ['./create.user.component.css']
})

export class UserCreateComponent {

    title = 'Registar Utilizador';

    createUser: string;
    email: string;

    constructor(
        private _user: UserService,
        private router: Router) { }

    // sign up when the form is valid
    create(model: User, isValid: boolean) {
        // check if model is valid
        if (isValid) {
            this._user.create(model).subscribe(
                data => {
                    this.createUser = data
                    this._user.activate(model.email).subscribe(
                        email => {
                            this.email = email;
                            let myContainer = <HTMLElement>document.querySelector("#notif");
                            myContainer.innerHTML = '<div class="alert alert-success">Verifique a sua caixa de correio para ativar a conta</div>';
                            setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                            this.router.navigate(['user/activated']);
                        },
                        error => {
                            let myContainer = <HTMLElement>document.querySelector("#notif");
                            myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                            setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                        }
                    );
                },
                error => {
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                }/*,
                () => {
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-success"><strong>Registo</strong> Efectuado com Sucesso</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                    this.router.navigate(['home']);
                }*/
            );
        }
    }
}
