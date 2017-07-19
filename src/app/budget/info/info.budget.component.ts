import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BudgetService } from '../budget.service';

import { Budget } from '../budget';
import { Observable } from "rxjs/Observable";

@Component({
    templateUrl: './info.budget.component.html',
    styleUrls: ['./info.budget.component.css'],
    providers: [BudgetService]
})

export class BudgetInfoComponent {

    title = 'Orçamento N.º';

    budget: Budget;

    constructor(
        private _budget: BudgetService,
        private router: ActivatedRoute,
        private nrouter: Router
    ) { }

    ngOnInit(): void {
        this.info(JSON.parse(localStorage.getItem('currentUser')).idUser);
    }
    info(id:number) {
        this.router.params
            .switchMap((params: Params) => this._budget.info(id,+params['id']))
            .subscribe(
            data => {
                this.budget = data;
            },
            error => {
                this.nrouter.navigate(['home']);
                console.log(error);
            })
    }
}