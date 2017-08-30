import { Component, Input } from '@angular/core';
import { Router, Params } from "@angular/router";

import { VehicleService } from '../vehicle.service';


import { Verify } from '../verify';



@Component({
    templateUrl: './exists.vehicle.component.html',
    styleUrls: ['./exists.vehicle.component.css']
})

export class VehicleExistsComponent {

    title = 'Registar Veículo';

    vehicles: string;


    constructor(
        private _vehicle: VehicleService,
        private router: Router) { }
    ngOnInit(): void{
        setTimeout(() => { this.router.navigate(['home']); }, 5000);
    }
}
