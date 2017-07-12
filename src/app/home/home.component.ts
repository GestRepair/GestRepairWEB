import { Component } from '@angular/core';
import { ServiceService } from "app/service/service.service";
import { Router } from "@angular/router";
import { Service } from "app/service/service";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  title = 'GestRepair';
  services: Service[];
  
  constructor(private _serviceService: ServiceService, private router: Router) { }
  ngOnInit() {
    this.serv();
  }
  serv() {
	  this._serviceService.list().subscribe(
		  services => this.services = services,
		  error => console.log("Impossível carregar lista de Serviços")
	  );
  }
}
