import { Component } from '@angular/core';
import { ServiceService } from "app/service/service.service";
import { Router } from "@angular/router";
import { Service } from "app/service/service";
import { API } from '../../main';
declare var $;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  title = 'GestRepair';
  services: Service[];
  photo = API.url+API.port+"/service/img/";
  constructor(private _serviceService: ServiceService, private router: Router) {
   }
  ngOnInit() {
    this.serv();
    this.carousel();
  }
  serv() {
    this._serviceService.list().subscribe(
      services => this.services = services,
      error => console.log("Impossível carregar lista de Serviços")
    );
  }
  carousel() {
    // Instantiate the Bootstrap carousel
    $('.multi-item-carousel').carousel({
      interval: false
    });

    // for every slide in carousel, copy the next slide's item in the slide.
    // Do the same for the next, next item.
    $('.multi-item-carousel .item').each(function () {
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));

      if (next.next().length > 0) {
        next.next().children(':first-child').clone().appendTo($(this));
      } else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    });
  }
}
