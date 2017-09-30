import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../user.service';

import { User } from '../user';

@Component({
    templateUrl: './create.user.component.html',
    styleUrls: ['./create.user.component.css']
})

export class UserCreateComponent {
    i = 0;
    e = 0;
    bot = 0;
    tam = false;
    nifVal = false;
    eq = false;
    title = 'Registar Utilizador';
    createUser: string;
    email: string;
    pass: string;
    conf: string;
    constructor(
        private _user: UserService,
        private router: Router) {
    }
    // validate the nif number
    validarNIF(nif) {
        var x: string = String(nif);
        var zerm = 9 * nif.charAt(0);
        var firm = 8 * nif.charAt(1);
        var secm = 7 * nif.charAt(2);
        var trem = 6 * nif.charAt(3);
        var form = 5 * nif.charAt(4);
        var fivm = 4 * nif.charAt(5);
        var sixm = 3 * nif.charAt(6);
        var sevm = 2 * nif.charAt(7);
        var sum = zerm + firm + secm + trem + form + fivm + sixm + sevm;
        var resNif = sum % 11;
        resNif = (resNif == 0 || resNif == 1) ? 0 : (11 - resNif);
        if (nif.charAt(8) == resNif && x.length == 9) {
            if (x.length == 9) {
                this.bot = 1;
                this.nifVal = true;
                this.tam = true;
            } else {
                this.bot = 0;
                this.nifVal = false;
                this.tam = false;
            }
        } else {
            this.tam = false;
            this.bot = 0;
            this.nifVal = false;
        }
    }
    /**
     * Valida o nif após a sua inserssão
     * @param event 
     */
    private onChange(event) {
        this.i = 1;
        let newValue = event.target.value;
        this.validarNIF(newValue);
    }
    /**
     * Verifica a se a pass é igual à confirmação
     */
    verifypass() {
        this.e = 1;
        if (this.pass == this.conf) { this.eq = true; }
        else { this.eq = false };
    }
    /**
     * Cria utilizador
     * @param model 
     * @param isValid 
     */
    create(model: User, isValid: boolean) {
        // check if model is valid
        if (isValid || this.nifVal == true || this.eq == true || this.tam == true) {
            model.password = this.pass;
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
                }
            );
        }

    }
}
