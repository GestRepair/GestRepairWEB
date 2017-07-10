import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { VehicleListService } from './list.vehicle.service';

import { VehicleList } from './listvehicle';

@Component({
	templateUrl: './list.vehicle.component.html',
	styleUrls: ['./list.vehicle.component.css'],
	providers: [VehicleListService]
})

export class VehicleListComponent {

	title = 'Lista de Veiculos';

	vehicles: VehicleList[];
	errorMessage: string;
	searchFilter: string;

	constructor(
		private _VehicleListService: VehicleListService,
		private router: ActivatedRoute
	) { }

	// Method that is called on initialization of the page
	ngOnInit(): void {
		this._VehicleListService.getVehicles(JSON.parse(localStorage.getItem('currentUser')).numUtilizador).subscribe(
			vehicles => this.vehicles = vehicles,
			error => console.log("Impossível carregar lista de estudantes")
		);
	}  
}