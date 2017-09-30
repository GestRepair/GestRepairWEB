import { Component } from '@angular/core';
import { AppService } from "app/app.service";
import { ServiceService } from "app/service/service.service";
import { Router } from "@angular/router";
import { Service } from "app/service/service";
declare var $;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = 'app';

  services: Service[];

  private username: string;
  private password: string;
  private idUser: number;
  private name: string;
  private nameRole: string;
  private loading = false;
  private error = false;
  private autenticated = false;


  constructor(private _httpService: AppService, private _serviceService: ServiceService, private router: Router) { }
  /**
   * Classe que é inicializada automáticamente
   */
  ngOnInit() {
    this.serv();
    this.autologin();
  }
  /**
   * Inicia os serviços
   */
  serv() {
    this._serviceService.list().subscribe(
      services => this.services = services,
      error => {
        console.log("Impossível carregar lista de Serviços")
        this.router.navigate(['home']);
      }
    );
  }
  /**
   * Caso já exista dados efectua o login
   */
  autologin() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.loading = true;
      this._httpService.auth(JSON.parse(localStorage.getItem('currentUser')).username, JSON.parse(localStorage.getItem('currentUser')).password).subscribe(
        result => {
          this.error = false;
          this.autenticated = true;
          this.name = JSON.parse(localStorage.getItem('currentUser')).name;
          this.nameRole = JSON.parse(localStorage.getItem('currentUser')).nameRole;
        },
        error => {
          this.error = true;
          this.loading = false;
        }
      );

    }
  }
  /**
   * Efectua o login
   */
  login() {
    let myContainer = <HTMLElement>document.querySelector("#notif");
    this.loading = true;
    this._httpService.auth(this.username, this.password).subscribe(
      result => {
        this.error = false;
        this.autenticated = true;
        this.name = JSON.parse(localStorage.getItem('currentUser')).name;
        this.nameRole = JSON.parse(localStorage.getItem('currentUser')).nameRole;
        myContainer.innerHTML = '<div class="alert alert-success"><strong>Login</strong> Bem-Vindo ' + this.name + '</div>';
        $("#myModal").modal("hide");
      },
      error => {
        this.error = true;
        this.loading = false;
        myContainer.innerHTML = '<div class="alert alert-danger"><strong>Login</strong> ' + error + '</div>';
      }
    );
    setTimeout(() => { myContainer.innerHTML = '' }, 3000);

  }
  /**
   * Termina a sessão
   */
  logout() {
    this._httpService.logout();
    this.autenticated = false;
    this.loading = false;
    let myContainer = <HTMLElement>document.querySelector("#notif");
    myContainer.innerHTML = '<div class="alert alert-warning"><strong>Logout</strong> Efectuado com Sucesso</div>';
    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
    this.router.navigate(['home']);
  }
}
