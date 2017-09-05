import { Component, Input, Directive, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";


import { UserService } from '../user.service';

import { User } from '../user';

@Component({
    templateUrl: './edit.user.component.html',
    styleUrls: ['./edit.user.component.css']
})
@Directive({
    selector: '[ngModel]',
    host: {
        '(ngModelChange)': 'onInputChange($event)'
    }
})
export class UserEditComponent {
    title = 'Editar Utilizador';
    bot = 0;
    tam = false;
    nifVal = false;
    data: string;
    user: User;
    ename: string;
    estreet: string;
    ezipcode: string;
    ecity: string;
    eemail: string;
    econtact: string;
    enif: string;
    constructor(
        private _UserService: UserService,
        private router: ActivatedRoute,
        private nrouter: Router) {

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
    ngOnInit(): void {
        this.info();
        
    }
    info() {
        this._UserService.info(JSON.parse(localStorage.getItem('currentUser')).idUser).subscribe(
            data => {
                this.user = data;
                this.ename = this.user.name;
                this.estreet = this.user.street;
                this.ezipcode = this.user.zipcode;
                this.ecity = this.user.city;
                this.eemail = this.user.email;
                this.econtact = this.user.contact;
                this.enif = this.user.nif;
                this.validarNIF(this.user.nif);
            },
            error => {
                this.nrouter.navigate(['home']);
                console.log(error);
            });
    }
    update(model: User) {
        model.name = this.ename;
        model.street = this.estreet;
        model.zipcode = this.ezipcode;
        model.city = this.ecity;
        model.email = this.eemail;
        model.contact = this.econtact;
        model.nif = this.enif;
        return model;
    }
    updateName(name: string) {
        this.ename = name;
    }
    updateStreet(stre: string) {
        this.estreet = stre;
    }
    updateZip(zip: string) {
        this.ezipcode = zip;
    }
    updateCity(city: string) {
        this.ecity = city;
    }
    updateEmail(email: string) {
        this.eemail = email;
    }
    updateContact(cont: string) {
        this.econtact = cont;
    }
    updateNIF(nif: string) {
        this.enif = nif;
    }
    private onChange(event) {
        let newValue = event.target.value;
        this.validarNIF(newValue);
    }
    // sign up when the form is valid
    edit(isValid: boolean) {
        // check if model is valid
        let myContainer = <HTMLElement>document.querySelector("#notif");
        this._UserService.edit(this.update(this.user), JSON.parse(localStorage.getItem('currentUser')).idUser).subscribe(
            data => {
                this.data = data
                myContainer.innerHTML = '<div class="alert alert-success"><strong>Alteração do registo</strong> efectuada com sucesso</div>';
                this.nrouter.navigate(['home']);
            },
            error => {
                myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
            }
        );
        setTimeout(() => { myContainer.innerHTML = '' }, 3000)
    }
}