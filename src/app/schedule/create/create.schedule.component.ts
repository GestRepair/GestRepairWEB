import { Component, ElementRef } from '@angular/core';
import { ScheduleService } from "app/schedule/schedule.service";
import { Router } from "@angular/router";
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
 
  constructor(private _schedule: ScheduleService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    $(function () {
      $('#datetimepicker6').datetimepicker({
        useCurrent: true, //Important! See issue #1075
        format:'DD/MM/YYYY HH:mm'
      });
      $("#datetimepicker6").on("dp.change", function (e) {
        $('#datetimepicker6').data("DateTimePicker").minDate(e.useCurrent).daysOfWeekDisabled([0,6]).disabledHours([0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23, 24]);
      });
    });
  }
}
