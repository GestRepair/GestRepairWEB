import { Component, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";

import { VehicleService } from '../vehicle.service';


@Component({
    templateUrl: './disable.vehicle.component.html',
    styleUrls: ['./disable.vehicle.component.css']
})

export class VehicleDisableComponent {
    title = 'Retirar Viatura';

    constructor(
        private _vehicle: VehicleService,
        private router: ActivatedRoute,
        private nrouter: Router
    ) { }
    ngOnInit() {

    }
    /**
     * Aqui é chamada função pelo dono da viatura para desassociar a propria viatura
     */
    disable() {
        this.router.params
            .switchMap((params: Params) => this._vehicle.dis(+params['id']))
            .subscribe(
            () => {
                let myContainer = <HTMLElement>document.querySelector("#notif");
                myContainer.innerHTML = '<div class="alert alert-success"><strong>Viatura</strong> Retirada com Sucesso</div>';
                setTimeout(() => { myContainer.innerHTML = '' }, 3000);
                this.nrouter.navigate(['home']);
            },
            error => {
                console.log(error);
            })
    }
}