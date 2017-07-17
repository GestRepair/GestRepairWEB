import { Component, ElementRef } from '@angular/core';
import { ScheduleService } from "app/schedule/schedule.service";
import { Router } from "@angular/router";
import { VehicleService } from "app/vehicle/vehicle.service";
import { VehicleList } from "app/vehicle/list/listvehicle";
import { ServiceService } from "app/service/service.service";
import { Service } from "app/service/service";
import { Schedule} from "app/schedule/schedule";
import * as moment from 'moment';
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'schedule',
  templateUrl: './create.schedule.component.html',
  styleUrls: ['./create.schedule.component.css']
})
export class ScheduleCreateComponent {

  title = 'Agendar Serviço';
  schedule:string;
  services:Service[];
  vehicles:VehicleList[];
  constructor(private _schedule: ScheduleService, private _service:ServiceService,private _vehicle:VehicleService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.datapicker();
    this.serv();
    this.vehic(JSON.parse(localStorage.getItem('currentUser')).numUtilizador);
  }
  // sign up when the form is valid
	create(model: Schedule, isValid: boolean) {
        // check if model is valid
        if (isValid) {
            this._schedule.create(model).subscribe(
                data => {
                    this.schedule = data;
                    console.log(data);
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
  serv() {
    this._service.list().subscribe(
      services => this.services = services,
      error => {
        console.log("Impossível carregar lista de Serviços")
      }
    );
  }
  vehic(id:number) {
    this._vehicle.list(id).subscribe(
      vehicles=> this.vehicles = vehicles,
      error => {
        console.log("Impossível carregar lista de Veiculos")
      }
    );
  }
  datapicker() {
    $(function () {
      $('#datetimepicker6').datetimepicker({
        useCurrent: true, //Important! See issue #1075
        format: 'YYYY/MM/DD HH:mm'
      });
      $("#datetimepicker6").on("dp.change", function (e) {
        $('#datetimepicker6').data("DateTimePicker").minDate(e.useCurrent).daysOfWeekDisabled([0, 6]).disabledHours([0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23, 24]);
      });
    });
  }
}
