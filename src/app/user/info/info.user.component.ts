import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { UserInfoService } from './info.user.service';

import { UserInfo } from './infouser';

@Component({
    templateUrl: './info.user.component.html',
    styleUrls: ['./info.user.component.css'],
    providers: [UserInfoService]
})

export class UserInfoComponent {

    title = 'Informação do Utilizador';

    user: UserInfo;

    constructor(
        private _UserInfoService: UserInfoService,
        private router: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.router.params
            .switchMap((params: Params) => this._UserInfoService.info(JSON.parse(localStorage.getItem('currentUser')).numUtilizador))
            .subscribe(
            user => {
                this.user = user;
            },
            error => console.log("Impossível carregar perfil de Utilizador")
            );
    }
}