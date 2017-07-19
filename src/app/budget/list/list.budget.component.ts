import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { BudgetService } from '../budget.service';

import { Budget } from '../budget';

@Component({
	templateUrl: './list.budget.component.html',
	styleUrls: ['./list.budget.component.css'],
	providers: [BudgetService]
})

export class BudgetListComponent {

	title = 'Histórico de Orçamentos';

	budgets: Budget[];
	errorMessage: string;
	searchFilter: string;

	constructor(
		private _Repair: BudgetService,
		private router: ActivatedRoute
	) { }

	// Method that is called on initialization of the page
	ngOnInit(): void {
		this.getList(JSON.parse(localStorage.getItem('currentUser')).idUser);
	}
	getList(id:number) {
		this._Repair.list(id).subscribe(
			budget => this.budgets = budget,
			error => console.log("Impossível carregar lista de Reparações")
		);
	}
}