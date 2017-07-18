import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { RepairService } from '../repair.service';

import { Repair } from '../repair';

@Component({
	templateUrl: './list.repair.component.html',
	styleUrls: ['./list.repair.component.css'],
	providers: [RepairService]
})

export class RepairListComponent {

	title = 'Histórico de Reparações';

	repairs: Repair[];
	errorMessage: string;
	searchFilter: string;

	constructor(
		private _Repair: RepairService,
		private router: ActivatedRoute
	) { }

	// Method that is called on initialization of the page
	ngOnInit(): void {
		this.getList(JSON.parse(localStorage.getItem('currentUser')).idUser);
	}
	getList(id:number) {
		this._Repair.list(id).subscribe(
			repairs => this.repairs = repairs,
			error => console.log("Impossível carregar lista de Reparações")
		);
	}
}