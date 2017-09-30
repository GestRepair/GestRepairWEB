import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ActivatedRoute,  ParamMap, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { UserService } from "app/user/user.service";


@Component({
    templateUrl: './active.email.user.component.html',
    styleUrls: ['./active.email.user.component.css']
})

export class UserActiveEmailComponent {

    title = 'Activação da Conta';
    activ: string;
    email: string;
    token: string;
    constructor(private route: ActivatedRoute,
        private nrouter: Router
        ,private _User: UserService) {
    }
    /**
     * Activa a função para ativar a conta
     */
    activate() {
        this.route.params
        .switchMap((params: Params) => this._User.active(params['email'],params['token']))
        .subscribe(
            activ => {
                this.activ = activ;
                let myContainer = <HTMLElement>document.querySelector("#notif");
                myContainer.innerHTML = '<div class="alert alert-success"><strong>Conta</strong> Ativada com Sucesso</div>';
                setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                this.nrouter.navigate(['home']);
			},
			error => {
				let myContainer = <HTMLElement>document.querySelector("#notif");
                myContainer.innerHTML = '<div class="alert alert-warning">'+error+'</div>';
                setTimeout(() => { myContainer.innerHTML = '' }, 3000)
				this.nrouter.navigate(['home']);
			}
        );
    }
}