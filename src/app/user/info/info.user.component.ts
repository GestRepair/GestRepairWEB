import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from '../user.service';

import { UserInfo } from './infouser';

@Component({
    templateUrl: './info.user.component.html',
    styleUrls: ['./info.user.component.css'],
    providers: [UserService]
})

export class UserInfoComponent {

    title = 'Informação do Utilizador';

    user: UserInfo;

    constructor(
        private _UserService: UserService,
        private router: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.info(JSON.parse(localStorage.getItem('currentUser')).numUtilizador);
    }
    info(id:number) {
        this.router.params
            .switchMap((params: Params) => this._UserService.info(id))
            .subscribe(
            user => {
                this.user = user;
            },
            error => console.log("Impossível carregar perfil de Utilizador")
            );
    }
}