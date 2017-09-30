import { Component, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";

import { ScheduleService } from '../schedule.service';


@Component({
    templateUrl: './disable.schedule.component.html',
    styleUrls: ['./disable.schedule.component.css']
})

export class ScheduleDisableComponent {
    title = 'Cancelar Agendamento';

    constructor(
        private _schedule: ScheduleService,
        private router: ActivatedRoute,
        private nrouter: Router
    ) {  }
    ngOnInit() {

    }
    /**
     * Função que desabilita orçamento
     */
    public disable() {
        this.router.params
            .switchMap((params: Params) => this._schedule.disable(+params['id']))
            .subscribe(
            () => {
                this.nrouter.navigate(['schedule']);
            },
            error => {
                this.nrouter.navigate(['home']);
                console.log(error);
            })
    }
}