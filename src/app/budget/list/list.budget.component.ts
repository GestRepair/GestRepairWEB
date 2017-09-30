import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BudgetService } from '../budget.service';

import { Budget } from '../budget';

@Component({
	templateUrl: './list.budget.component.html',
	styleUrls: ['./list.budget.component.css'],
	providers: [BudgetService]
})
/**
 * Listagem de orçamentos do utilizador
 */
export class BudgetListComponent {

	title = 'Histórico de Orçamentos';

	budgets: Budget[];
	errorMessage: string;
	searchFilter: string;

	constructor(
		private _Repair: BudgetService,
		private router: ActivatedRoute,
		private nrouter: Router
	) { }

	// Method that is called on initialization of the page
	ngOnInit(): void {
		this.getList(JSON.parse(localStorage.getItem('currentUser')).idUser);
	}
	/**
	 * Mostra a lista de orçamento
	 * @param id
	 */
	getList(id: number) {
		this._Repair.list(id).subscribe(
			budget => this.budgets = budget,
			error => console.log("Impossível carregar lista de Reparações")
		);
	}
	/**
	 * Função que aprova os orçamentos
	 * @param idBudget 
	 */
	aproved(idBudget: number) {
		let myContainer = <HTMLElement>document.querySelector("#notif");
		this._Repair.aproved(idBudget, 3).subscribe(
			budget => {
				myContainer.innerHTML = '<div class="alert alert-success">O seu <strong>orçamento foi</strong> aprovado</div>';
				this.nrouter.navigate(['home']);
			},
			error => {
				myContainer.innerHTML = '<div class="alert alert-warning"><strong>ERRO</strong> UPS... Algo correu mal</div>';
			}
		);
		setTimeout(() => { myContainer.innerHTML = '' }, 3000)
	}
	/**
	 * Função que não aprova os orçamentos
	 * @param idBudget 
	 */
	notaproved(idBudget: number) {
		let myContainer = <HTMLElement>document.querySelector("#notif");
		this._Repair.aproved(idBudget, 4).subscribe(
			budget => {
				myContainer.innerHTML = '<div class="alert alert-danger">O seu <strong>orçamento não foi</strong> aprovado</div>';
				this.nrouter.navigate(['home']);
			},
			error => {
				myContainer.innerHTML = '<div class="alert alert-warning"><strong>ERRO</strong> UPS... Algo correu mal</div>';
			}
		);
		setTimeout(() => { myContainer.innerHTML = '' }, 3000)
	}

}