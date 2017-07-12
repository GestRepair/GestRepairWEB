import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../user.service';

import { UserEdit } from './edituser';

@Component({
    templateUrl: './edit.user.component.html',
    styleUrls: ['./edit.user.component.css']
})

export class UserEditComponent {
    title = 'Editar Utilizador';
    data: string;
    selectedEdit: UserEdit;
    
    constructor(
        private _UserService: UserService,
        private router: Router) { 
            
        }
    ngOnInit(){
        
    }
    // sign up when the form is valid
    edit(model: UserEdit, isValid: boolean) {
        // check if model is valid
        if (isValid) {
            this._UserService.edit(model,JSON.parse(localStorage.getItem('currentUser')).numUtilizador).subscribe(
                data => {
                    this.data = data
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