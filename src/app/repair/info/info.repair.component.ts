import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { RepairService } from '../repair.service';

import { Repair, Part } from '../repair';
import { Observable } from "rxjs/Observable";

@Component({
    templateUrl: './info.repair.component.html',
    styleUrls: ['./info.repair.component.css'],
    providers: [RepairService]
})

export class RepairInfoComponent {

    title = 'Reparação';

    repair: Repair;
    parts:Part[];

    constructor(
        private _repair: RepairService,
        private router: ActivatedRoute,
        private nrouter: Router
    ) { }

    ngOnInit(): void {
        this.info(JSON.parse(localStorage.getItem('currentUser')).idUser);
    }
    info(id:number) {
        this.router.params
            .switchMap((params: Params) => this._repair.info(id,+params['id']))
            .subscribe(
            data => {
                this.repair = data;
                this.parts = data.part;
            },
            error => {
                this.nrouter.navigate(['home']);
                console.log(error);
            })
    }
}