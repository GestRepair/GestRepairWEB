import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ServiceService } from '../service.service';

import { Service } from '../service';

@Component({
	templateUrl: './info.service.component.html',
	styleUrls: ['./info.service.component.css'],
	providers: [ServiceService]
})

export class ServiceInfoComponent {

	service: Service;

	constructor(
		private _serviceService: ServiceService,
		private router: ActivatedRoute,
		private nrouter: Router
	) { }

	ngOnInit(): void {
		this.info();
	}
	info() {
		this.router.params
			.switchMap((params: Params) => this._serviceService.info(+params['id']))
			.subscribe(
			service => {
				this.service = service;
			},
			error => {
				console.log(error)
				this.nrouter.navigate(['home']);
			}
			);
	}
}