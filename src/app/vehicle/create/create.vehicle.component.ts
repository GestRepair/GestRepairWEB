import { Component, Input } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";

import { VehicleService } from '../vehicle.service';

import { Vehicle } from '../vehicle';
import { CreateVehicle } from './createVehicle';
import { Brand } from '../brand';
import { Fuel } from "app/vehicle/fuel";
import { Model } from '../model';
import { Verify } from '../verify';


@Component({
    templateUrl: './create.vehicle.component.html',
    styleUrls: ['./create.vehicle.component.css']
})

export class VehicleCreateComponent {
    
    private regis:string;
    title = 'Registar Veículo';
    vehic: string;
    vehicles: string;
    fuels: Fuel[];
    brands: Brand[];
    models: Model[];
    

    constructor(
        private _vehicle: VehicleService,
        private router: Router,
        private activatedRoute:ActivatedRoute
    ) {
       
    }
    ngOnInit(): void {
        this.listBrand();
        this.listFuel();  
        this.val();
    }
    val(){
        this.activatedRoute.params.subscribe((params: Params) => {
            this.regis = params['vehicle'];
          });
    }

    listBrand() {
        this._vehicle.listBrand().subscribe(
            brands => this.brands = brands,
            error => console.log("Impossível carregar lista de marcas")
        );
    }
    listModel(id: number) {
        this._vehicle.listModel(id).subscribe(
            models => this.models = models,
            error => console.log("Impossível carregar lista de modelos")
        );
    }
    listFuel() {
        this._vehicle.listFuel().subscribe(
            fuels => this.fuels = fuels,
            error => console.log("Impossível carregar lista de marcas")
        );
    }
    // sign up when the form is valid
    create(model: CreateVehicle, isValid: boolean) {
        // check if model is valid
        console.log(this.regis);
        if (isValid) {
            let myContainer = <HTMLElement>document.querySelector("#notif");
            this._vehicle.verify(this.regis).subscribe(
                data => {
                    this.vehicles = data;
                    if(data.data.bool==0){
                        this._vehicle.create(model).subscribe(
                            data => {
                                this.vehicles = data;
                                myContainer.innerHTML = '<div class="alert alert-success">Registo da viatura efetuada com sucesso</div>';
                            },
                            error => {
                                myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                            }
                        );
                        setTimeout(() => { myContainer.innerHTML = '' }, 3000);
                        setTimeout(() => { this.router.navigate(['vehicle/home']);  }, 1000);
                    }else{
                        myContainer.innerHTML = '<div class="alert alert-danger">A Viatura já existe</div>';
                        setTimeout(() => { myContainer.innerHTML = '' }, 3000);
                        this.router.navigate(['vehicle/exists']);
                    };
                },
                error => {
                    myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
                    setTimeout(() => { myContainer.innerHTML = '' }, 3000);
                }
            );
            
        }
    }
}
