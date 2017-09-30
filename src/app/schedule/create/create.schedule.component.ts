import { Component, ElementRef } from '@angular/core';
import { ScheduleService } from "app/schedule/schedule.service";
import { Router } from "@angular/router";
import { VehicleService } from "app/vehicle/vehicle.service";
import { Vehicle } from "app/vehicle/vehicle";
import { ServiceService } from "app/service/service.service";
import { Service } from "app/service/service";
import { Schedule } from "app/schedule/schedule";
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'schedule',
  templateUrl: './create.schedule.component.html',
  styleUrls: ['./create.schedule.component.css']
})
export class ScheduleCreateComponent {
  title = 'Agendar Serviço';
  dyear = new Date().getFullYear();
  dmonth = new Date().getMonth() + 1;
  dday = new Date().getDate();
  service= false;
  vehicle= false;
  yea= false;
  moun= false;
  da= false;
  hou= false;
  syear = 0;
  smonth = 0;
  sday = 0;
  shour = 0;
  ys = [];
  ms = [];
  ds = [];
  hs = [];
  schedule: Schedule;
  services: Service[];
  vehicles: Vehicle[];
  constructor(private _schedule: ScheduleService, private _service: ServiceService, private _vehicle: VehicleService, private router: Router) { }
  /**
   * Classe que é chamada no momento que a página é carregada
   */
  ngOnInit(): void {
    this.serv();
    this.vehic(JSON.parse(localStorage.getItem('currentUser')).idUser);
    this.year();
  }
  /**
   * Caso o serviço seja ativo este valor passa a true e é usado para a ativação do botão
   */
  obtServ() {
    this.service=true;
  }
  /**
   * Caso a viatura seja ativo este valor passa a true e é usado para a ativação do botão
   */
  obtVeh() {
    this.vehicle=true;
  }
  /**
   * Serve para verificar se as horas existem
   * @param hour 
   */
  obth(hour: number) {
    this.hou=true;
    this.shour = hour;
  }
  /**
   * Insere o proprio ano + 5 na dropdown
   * (Foi obtado em por 5 anos para a verificar o ano bissexto)
   */
  year() {
    for (var i = 0; i < 5; i++) {
      this.ys[i] = this.dyear + i;
    }
  }
  /**
   * Verifica o ano e insere os meses
   * @param year 
   */
  month(year: number) {
    this.yea=true;
    this.syear = year;
    this.ms = [];
    if (this.dyear == year) {
      for (var i = this.dmonth; i <= 12; i++) {
        this.ms[i] = i;
      }
    } else {
      for (var i = 1; i <= 12; i++) {
        this.ms[i] = i;
      }
    }
    this.ms = this.ms.filter(function (entry) { return /\S/.test(entry); });
  }
  /**
   * Verifica o mes e insere os dias
   * @param month 
   */
  day(month: number) {
    this.moun=true;
    this.smonth = month;
    this.ds = [];
    if (this.dyear == this.syear) {
      if (this.dmonth == month) {
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
          for (var i = this.dday + 1; i <= 31; i++) {
            this.ds[i] = i;
          }
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
          for (var i = this.dday + 1; i <= 30; i++) {
            this.ds[i] = i;
          }
        } else {
          if ((this.syear % 4 == 0 && this.syear % 100 != 0) || this.syear % 400 == 0) {
            for (var i = this.dday + 1; i <= 29; i++) {
              this.ds[i] = i;
            }
          } else {
            for (var i = this.dday + 1; i <= 28; i++) {
              this.ds[i] = i;
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
  }
  /**
   * Verifica os dias e insere as horas
   * @param day 
   */
  hour(day: number) {
    this.da=true;
    this.hs = [];
    this.sday = day;
    for (var i = 8; i < 12; i++) {
      this.hs[i] = i;
    }
    for (var i = 14; i < 18; i++) {
      this.hs[i] = i;
    }
    this.hs = this.hs.filter(function (entry) { return /\S/.test(entry); });
  }
  // sign up when the form is valid
  create(model: Schedule, isValid: boolean) {
    model.date = this.syear + "-" + this.smonth + "-" + this.sday + " " + this.shour + ":00";
    // check if model is valid
    if (isValid) {
      this._schedule.create(model).subscribe(
        data => {
          this.schedule = data;
        },
        error => {
          let myContainer = <HTMLElement>document.querySelector("#notif");
          myContainer.innerHTML = '<div class="alert alert-danger">' + error + '</div>';
          setTimeout(() => { myContainer.innerHTML = '' }, 3000)
        },
        () => {
          let myContainer = <HTMLElement>document.querySelector("#notif");
          myContainer.innerHTML = '<div class="alert alert-success"><strong>Agendamento</strong> Efectuado com Sucesso</div>';
          setTimeout(() => { myContainer.innerHTML = '' }, 3000)
          this.router.navigate(['home']);
        }
      );
    }
  }
  /**
   * Mostra a lista de serviços
   */
  serv() {
    this._service.list().subscribe(
      services => this.services = services,
      error => {
        console.log("Impossível carregar lista de Serviços")
      }
    );
  }
  /**
   * Mostra a lista de viaturas
   * @param id 
   */
  vehic(id: number) {
    this._vehicle.list(id).subscribe(
      vehicles => this.vehicles = vehicles,
      error => {
        console.log("Impossível carregar lista de Veiculos")
      }
    );
  }
}