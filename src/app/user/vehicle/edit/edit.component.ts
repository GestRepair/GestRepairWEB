import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { UserEditService } from './edit.service';

import { UserEdit } from './edit';

@Component({
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})

export class UserEditComponent {
    morada: any=  (JSON.parse(localStorage.getItem('currentUser')).morada).toString();
    

    title = 'Editar Utilizador';
    edit: string;
    selectedEdit: UserEdit;
    
    constructor(
        private _UserEditService: UserEditService,
        private router: Router) { 
            
        }
    ngOnInit(){
        
    }
    // sign up when the form is valid
    editUser(model: UserEdit, isValid: boolean) {
        // check if model is valid
        if (isValid) {
            this._UserEditService.edit(model,JSON.parse(localStorage.getItem('currentUser')).numUtilizador).subscribe(
                data => {
                    this.edit = data
                    
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