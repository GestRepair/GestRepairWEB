import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { RegisterService } from './register.service';

import { Register } from './register';

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    title = 'Registar Utilizador';

    registers: string;
    selectedRegister: Register;

    constructor(
        private _registerService: RegisterService,
        private router: Router) { }

    // sign up when the form is valid
    add(model: Register, isValid: boolean) {
        // check if model is valid
        if (isValid) {
            this._registerService.create(model).subscribe(
                data => this.registers = data,
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
