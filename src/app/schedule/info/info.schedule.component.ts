import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ScheduleService } from '../schedule.service';

import { Schedule } from '../schedule';
import { Observable } from "rxjs/Observable";

@Component({
    templateUrl: './info.schedule.component.html',
    styleUrls: ['./info.schedule.component.css'],
    providers: [ScheduleService]
})

export class ScheduleInfoComponent {

    title = 'Agendamento';

    schedule: Schedule;

    constructor(
        private _schedule: ScheduleService,
        private router: ActivatedRoute,
        private nrouter: Router
    ) { }

    ngOnInit(): void {
        this.info(JSON.parse(localStorage.getItem('currentUser')).idUser);
    }
    info(id:number) {
        this.router.params
            .switchMap((params: Params) => this._schedule.info(id,+params['id']))
            .subscribe(
            data => {this.schedule = data;
            },
            error => {
                this.nrouter.navigate(['home']);
                console.log(error);
            })
    }
}