import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../user.service';

import { User } from '../user';

@Component({
    templateUrl: './create.user.component.html',
    styleUrls: ['./create.user.component.css']
})

export class UserCreateComponent {
    i=0;
    nifVal=false;
    title = 'Registar Utilizador';
    createUser: string;
    email: string;
    constructor(
        private _user: UserService,
        private router: Router) {
        }
    // validate the nif number
    validarNIF(nif) {
        var x:string = String(nif);
        var firm = nif.charAt(8) * nif.charAt(2);
        var secm = nif.charAt(7) * nif.charAt(3);
        var trem = nif.charAt(6) * nif.charAt(4);
        var form = nif.charAt(5) * nif.charAt(5);
        var fivm = nif.charAt(4) * nif.charAt(6);
        var sixm = nif.charAt(3) * nif.charAt(7);
        var sevm = nif.charAt(2) * nif.charAt(8);
        var eigm = nif.charAt(1) * nif.charAt(9);
        var sum = firm + secm + trem + form + fivm + sixm + sevm + eigm;
        var resNif = sum % 11;
        if (resNif == 0 || resNif == 1) {
            resNif = 0;
        } else {
            resNif = 11 - resNif;
        }
        if (nif.charAt(9) != resNif || x.length != 9) {
            this.nifVal=false;
        }else{
            this.nifVal=true;
        }
    }
    private onChange(event) {
        this.i=1;
        let newValue = event.target.value;
        this.validarNIF(newValue);
      }
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
                    }
                );
            }

    }
}
