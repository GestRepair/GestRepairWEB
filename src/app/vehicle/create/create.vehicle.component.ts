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

    private regis: string;
    title = 'Registar Veículo';
    vehic: string;
    vehicles: string;
    fuels: Fuel[];
    brands: Brand[];
    models: Model[];


    constructor(
        private _vehicle: VehicleService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {

    }
    /**
     * Chama as funções quando a página é ativada
     */
    ngOnInit(): void {
        this.listBrand();
        this.listFuel();
        this.val();
        this.year();
    }
    /**
     * Vai buscar o valor do parametro do URL
     */
    val() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.regis = params['vehicle'];
        });
    }
    /**
     * Lista Marcas
     */
    listBrand() {
        this._vehicle.listBrand().subscribe(
            brands => this.brands = brands,
            error => console.log("Impossível carregar lista de marcas")
        );
    }
    /**
     * Lista modelos
     * @param id 
     */
    listModel(id: number) {
        this._vehicle.listModel(id).subscribe(
            models => this.models = models,
            error => console.log("Impossível carregar lista de modelos")
        );
        this.bbrand = true;
    }
    /*list to dropdown list of fuels*/
    listFuel() {
        this._vehicle.listFuel().subscribe(
            fuels => this.fuels = fuels,
            error => console.log("Impossível carregar lista de Combustiveis")
        );
    }
    // sign up when the form is valid
    create(model: CreateVehicle, isValid: boolean) {
        // check if model is valid
        if (isValid) {
            let myContainer = <HTMLElement>document.querySelector("#notif");
            this._vehicle.verify(this.regis).subscribe(
                data => {
                    this.vehicles = data;
                    if (data.data.bool == 0) {
                        model.registration = this.regis;
                        model.date = this.syear + "-" + this.smonth + "-" + this.sday;
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
                        setTimeout(() => { this.router.navigate(['vehicle/home']); }, 500);
                    } else {
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
    bbrand = false;
    bmodel = false;
    bfuel = false;
    byear = false;
    bmouth = false;
    bday = false;
    ldate: string;
    dyear = new Date().getFullYear();
    dmonth = new Date().getMonth() + 1;
    dday = new Date().getDate();
    syear = 0;
    smonth = 0;
    sday = 0;
    ys = [];
    ms = [];
    ds = [];
    /**
     * Verifica se o modelo foi selecionado
     */
    modelsel() {
        this.bmodel = true;
    }
    /**
     * Verifica se o modelo foi selecionado
     */
    fuelsel() {
        this.bfuel = true;
    }
    /**
     * Adiciona os ultimos 100 anos
     */
    year() {
        for (var i = 0; i < 100; i++) {
            this.ys[i] = this.dyear - i;
        }
    }
    /**
     * Vai buscar o mês através do ano
     * @param year 
     */
    month(year: number) {
        this.syear = year;
        this.ms = [];
        if (this.dyear == year) {
            for (var i = this.dmonth; i >= 1; i--) {
                this.ms[i] = i;
            }
        } else {
            for (var i = 1; i <= 12; i++) {
                this.ms[i] = i;
            }
            
        }
        this.ms = this.ms.filter(function (entry) { return /\S/.test(entry); });
        this.byear = true;
    }
    /**
     * Vai buscar os dias do ano através do mes
     * @param month 
     */
    day(month: number) {
        this.smonth = month;
        this.ds = [];
        if (this.dyear == this.syear) {
            if (this.dmonth == month) {
                for (var i = 1; i <= this.dday; i++) {
                    this.ds[i] = i;
                }
            } else {
                if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                    for (var i = 1; i <= 31; i++) {
                        this.ds[i] = i;
                    }
                } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                    for (var i = 1; i <= 30; i++) {
                        this.ds[i] = i;
                    }
                } else {
                    if ((this.syear % 4 == 0 && this.syear % 100 != 0) || this.syear % 400 == 0) {
                        for (var i = 1; i <= 29; i++) {
                            this.ds[i] = i;
                        }
                    } else {
                        for (var i = 1; i <= 28; i++) {
                            this.ds[i] = i;
                        }
                    }
                }
            }
        } else {
            if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                for (var i = 1; i <= 31; i++) {
                    this.ds[i] = i;
                }
            } else if (month == 4 || month == 6 || month == 9 || month == 11) {
                for (var i = 1; i <= 30; i++) {
                    this.ds[i] = i;
                }
            } else {
                if ((this.syear % 4 == 0 && this.syear % 100 != 0) || this.syear % 400 == 0) {
                    for (var i = 1; i <= 29; i++) {
                        this.ds[i] = i;
                    }
                } else {
                    for (var i = 1; i <= 28; i++) {
                        this.ds[i] = i;
                    }
                }
            }
        }
        this.ds = this.ds.filter(function (entry) { return /\S/.test(entry); });
        this.bmouth = true;
    }
    /**
     * Verifica a data
     * @param day 
     */
    dateday(day: number){
        this.sday = day;
        this.bday = true;
    }
}
