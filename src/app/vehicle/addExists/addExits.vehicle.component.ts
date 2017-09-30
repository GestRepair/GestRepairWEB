import { Component, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";

import { VehicleService } from '../vehicle.service';


import { Verify } from '../verify';



@Component({
    templateUrl: './addExits.vehicle.component.html',
    styleUrls: ['./addExits.vehicle.component.css']
})
/**
 * Adiciona a viatura se ela existir
 */
export class VehicleAddExistsComponent {
    veh: string;
    title = 'Registar Veículo';
    private regis: string;
    vehicles: string;


    constructor(
        private _vehicle: VehicleService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }
    ngOnInit(): void {
        this.val();
    }
    // sign up when the form is valid
    val() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.regis = params['vehicle'];
        });
    }
    /**
     * Faz as várias verificações para adicionar a viatura
     */
    add() {
        this._vehicle.verify(this.regis).subscribe(
            data => {
                this.vehicles = data;
                if (data.data.bool == 0) {
                    this.router.navigate(['vehicle/create/' + this.regis]);
                } else {
                    this._vehicle.nowner(this.regis).subscribe(
                        ndata => {
                            this.vehicles = ndata;
                            if (ndata.data.bool == 0) {
                                this._vehicle.add(this.regis).subscribe(
                                    nta => {
                                        this.vehicles = nta;
                                        let myContainer = <HTMLElement>document.querySelector("#notif");
                                        myContainer.innerHTML = '<div class="alert alert-success">Viatura adicionada com sucesso</div>';
                                        setTimeout(() => { myContainer.innerHTML = '' }, 3000);
                                        setTimeout(() => { this.router.navigate(['home']); }, 500)
                                    },
                                    error => {
                                        let myContainer = <HTMLElement>document.querySelector("#notif");
                                        myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                                        setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                                    }
                                );
                            } else {
                                this._vehicle.up(this.regis).subscribe(
                                    nata => {
                                        this.vehicles = nata;
                                        let myContainer = <HTMLElement>document.querySelector("#notif");
                                        myContainer.innerHTML = '<div class="alert alert-success">Viatura adicionada com sucesso</div>';
                                        setTimeout(() => { myContainer.innerHTML = '' }, 3000);
                                        setTimeout(() => { this.router.navigate(['home']); }, 500)
                                    },
                                    error => {
                                        let myContainer = <HTMLElement>document.querySelector("#notif");
                                        myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                                        setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                                    }
                                );
                            };
                        }
                    );
                }
            },
            error => {
                let myContainer = <HTMLElement>document.querySelector("#notif");
                myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                setTimeout(() => { myContainer.innerHTML = '' }, 3000)
            }
        );
    }
}
