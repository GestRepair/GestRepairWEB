import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { RepairService } from '../repair.service';

import { Repair, Part, Employer } from '../repair';

@Component({
	templateUrl: './list.repair.component.html',
	styleUrls: ['./list.repair.component.css'],
	providers: [RepairService]
})

export class RepairListComponent {

	title = 'Histórico de Reparações';
	parts: Part[];
	repairs: Repair[];
	employers: Employer[];

	constructor(
		private _Repair: RepairService,
		private router: ActivatedRoute,
		private nrouter: Router
	) { }

	// Method that is called on initialization of the page
	ngOnInit(): void {
		this.getList(JSON.parse(localStorage.getItem('currentUser')).idUser);
		//this.info(this.repair.idRepair);
	}
	getList(id: number) {
		this._Repair.list(id).subscribe(
			repairs => {
				this.repairs = repairs;
				//this.repair = this.info(repairs)
			},
			error => console.log("Impossível carregar lista de Reparações"),
		);
	}
	getInfo(rep: number) {
		setTimeout(() => {
			this.infopart(rep);
			this.infoEmployer(rep);
		}, 100);
	}
	infopart(rep: number) {
		this.router.params
			.switchMap((params: Params) => this._Repair.part(rep))
			.subscribe(
			data => {
				this.parts = data;
				//this.parts = data.part;
			},
			error => {
				this.nrouter.navigate(['home']);
				console.log(error);
			})
	}
	infoEmployer(rep: number) {
		this.router.params
			.switchMap((params: Params) => this._Repair.employer(rep))
			.subscribe(
			data => {
				this.employers = data;
				//this.parts = data.part;
			},
			error => {
				this.nrouter.navigate(['home']);
				console.log(error);
			})
	}
}