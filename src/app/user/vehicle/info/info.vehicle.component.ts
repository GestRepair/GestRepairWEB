import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { VehicleInfoService } from './info.vehicle.service';

import { VehicleInfo } from './infovehicle';

@Component({
    templateUrl: './info.vehicle.component.html',
	styleUrls: ['./info.vehicle.component.css'],
	providers: [VehicleInfoService]
})

export class VehicleInfoComponent {

    title = 'Informação do Veiculo';

	vehicle: VehicleInfo;

    constructor(
		private _VehicleInfoService: VehicleInfoService,
        private router: ActivatedRoute
    ) { }

	ngOnInit(): void {
		this.info();
	}
	info() {
		this.router.params
			.switchMap((params: Params) => this._VehicleInfoService.info(+params['id']))
			.subscribe(
			vehicle => {
				this.vehicle = vehicle;
			},
			error => console.log("Impossível carregar perfil de Utilizador")
			);
	}
}