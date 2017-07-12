import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { VehicleService } from '../vehicle.service';

import { VehicleInfo } from './infovehicle';

@Component({
    templateUrl: './info.vehicle.component.html',
	styleUrls: ['./info.vehicle.component.css'],
	providers: [VehicleService]
})

export class VehicleInfoComponent {

    title = 'Informação do Veiculo';

	vehicle: VehicleInfo;

    constructor(
		private _VehicleService: VehicleService,
        private router: ActivatedRoute
    ) { }

	ngOnInit(): void {
		this.info();
	}
	info() {
		this.router.params
			.switchMap((params: Params) => this._VehicleService.info(+params['id']))
			.subscribe(
			vehicle => {
				this.vehicle = vehicle;
			},
			error => console.log("Impossível carregar perfil de Utilizador")
			);
	}
}