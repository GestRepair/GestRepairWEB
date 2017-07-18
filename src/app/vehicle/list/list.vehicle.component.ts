﻿import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { VehicleService } from '../vehicle.service';

import { Vehicle } from '../vehicle';

@Component({
	templateUrl: './list.vehicle.component.html',
	styleUrls: ['./list.vehicle.component.css'],
	providers: [VehicleService]
})

export class VehicleListComponent {

	title = 'Lista de Veiculos';

	vehicles: Vehicle[];
	errorMessage: string;
	searchFilter: string;

	constructor(
		private _VehicleService: VehicleService,
		private router: ActivatedRoute
	) { }

	// Method that is called on initialization of the page
	ngOnInit(): void {
		this.getList(JSON.parse(localStorage.getItem('currentUser')).idUser);
	}
	getList(id:number) {
		this._VehicleService.list(id).subscribe(
			vehicles => this.vehicles = vehicles,
			error => console.log("Impossível carregar lista de estudantes")
		);
	}
}