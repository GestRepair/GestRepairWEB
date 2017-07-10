import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { UserCreateService } from './create.user.service';

import { UserCreate } from './createuser';

@Component({
	templateUrl: './create.user.component.html',
	styleUrls: ['./create.user.component.css']
})

export class UserCreateComponent {

    title = 'Registar Utilizador';

    createUser: string;
	selectedRegister: UserCreate;

    constructor(
		private _createUserService: UserCreateService,
        private router: Router) { }

    // sign up when the form is valid
	addUser(model: UserCreate, isValid: boolean) {
        // check if model is valid
        if (isValid) {
            this._createUserService.create(model).subscribe(
                data => {
					this.createUser = data
                    console.log(data);
                },
                error => {
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                },
                () => {
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-success"><strong>Registo</strong> Efectuado com Sucesso</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                    this.router.navigate(['home']);
                }
            );
        }
    }
}
