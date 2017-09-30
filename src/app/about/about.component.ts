import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { API } from '../../main';
declare var $;

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
/**
 * Página de informação sobre o produto
 */
export class AboutComponent {
  title = 'Sobre Nós';
  photo = API.url+API.port+"/service/img/";
  constructor( private router: Router) {
   }
  ngOnInit() {

  }
}
