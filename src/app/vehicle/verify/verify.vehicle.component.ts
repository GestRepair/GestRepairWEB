import { Component, Input } from '@angular/core';
import { Router, Params } from "@angular/router";

import { VehicleService } from '../vehicle.service';


import { Verify } from '../verify';



@Component({
    templateUrl: './verify.vehicle.component.html',
    styleUrls: ['./verify.vehicle.component.css']
})

export class VehicleVerifyComponent {
    veh: string;
    title = 'Registar Veículo';

    vehicles: string;


    constructor(
        private _vehicle: VehicleService,
        private router: Router) { }
    ngOnInit(): void {
    }
    // sign up when the form is valid
    verify(isValid: boolean) {
        // check if model is valid
        if (isValid) {
            this._vehicle.verify(this.veh).subscribe(
                data => {
                    this.vehicles = data;
                    if (data.data.bool == 0) {
                        this.router.navigate(['vehicle/create/' + this.veh]);
                    } else {
                        this._vehicle.owner(this.veh).subscribe(
                            ndata => {
                                this.vehicles = ndata;
                                if (ndata.data.bool == 0) {
                                    this.router.navigate(['vehicle/create/exists/'+this.veh]);
                                } else {
                                    let myContainer = <HTMLElement>document.querySelector("#notif");
                                    myContainer.innerHTML = '<div class="alert alert-danger">A Viatura já existe</div>';
                                    setTimeout(() => { myContainer.innerHTML = '' }, 3000);
                                    this.router.navigate(['vehicle/exists']);
                                };
                            },
                            error => {
                                let myContainer = <HTMLElement>document.querySelector("#notif");
                                myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                                setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                            }
                        );
                    }
                    error => {
                        let myContainer = <HTMLElement>document.querySelector("#notif");
                        myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                        setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                    }
                }
            );
        }
    }
}
