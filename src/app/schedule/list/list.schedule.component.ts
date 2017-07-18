import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ScheduleService } from '../schedule.service';

import { Schedule } from '../schedule';

@Component({
	templateUrl: './list.schedule.component.html',
	styleUrls: ['./list.schedule.component.css'],
	providers: [ScheduleService]
})

export class ScheduleListComponent {

	title = 'Lista de Agendamentos';

	schedules: Schedule[];
	errorMessage: string;
	searchFilter: string;

	constructor(
		private _schedule: ScheduleService,
		private router: ActivatedRoute
	) { }

	// Method that is called on initialization of the page
	ngOnInit(): void {
		this.getList(JSON.parse(localStorage.getItem('currentUser')).numUtilizador);
	}
	getList(id:number) {
		this._schedule.list(id).subscribe(
			vehicles => this.schedules = vehicles,
			error => console.log("Impossível carregar lista de agendamentos")
		);
	}
}