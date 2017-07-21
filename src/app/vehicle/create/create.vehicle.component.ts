import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";

import { VehicleService } from '../vehicle.service';

import { Vehicle } from '../vehicle';
import { CreateVehicle } from './createVehicle';
import { Brand } from '../brand';
import { Fuel } from "app/vehicle/fuel";
import { Model } from '../model';


@Component({
    templateUrl: './create.vehicle.component.html',
    styleUrls: ['./create.vehicle.component.css']
})

export class VehicleCreateComponent {

    title = 'Registar Veículo';

    vehicles: string;
    fuels:Fuel[];
    brands:Brand[];
    models:Model[];

    constructor(
        private _vehicle: VehicleService,
        private router: Router) { }
    ngOnInit(): void{
        this.listBrand();
        this.listFuel();
    }

    listBrand(){
        this._vehicle.listBrand().subscribe(
			brands => this.brands = brands,
			error => console.log("Impossível carregar lista de marcas")
		);
    }
    listModel(id:number){
        this._vehicle.listModel(id).subscribe(
			models => this.models = models,
			error => console.log("Impossível carregar lista de modelos")
		);
    }
    listFuel(){
        this._vehicle.listFuel().subscribe(
			fuels => this.fuels = fuels,
			error => console.log("Impossível carregar lista de marcas")
		);
    }
    // sign up when the form is valid
    create(model: CreateVehicle, isValid: boolean) {
        // check if model is valid
        if (isValid) {
            this._vehicle.create(model).subscribe(
                data => {
                    this.vehicles = data
                },
                error => {
                    let myContainer = <HTMLElement>document.querySelector("#notif");
                    myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
                }
            );
        }
    }
}
