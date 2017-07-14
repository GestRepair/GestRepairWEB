import { Component } from '@angular/core';
import { AppService } from "app/app.service";
import { ServiceService } from "app/service/service.service";
import { Router } from "@angular/router";
import { Service } from "app/service/service";

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
  private numUtilizador: number;
  private nome: string;
  private morada: string;
  private codPostal: string;
  private localidade: string;
  private nameRole: string;
  private email: string;
  private contacto: string;
  private nif: string;
  private loading = false;
  private error = false;
  private autenticated = false;


  constructor(private _httpService: AppService, private _serviceService: ServiceService, private router: Router) { }
  ngOnInit() {
    this.serv();
    this.autologin();
  }
  serv() {
    this._serviceService.list().subscribe(
      services => this.services = services,
      error => {
        console.log("Impossível carregar lista de Serviços")
        this.router.navigate(['home']);
      }
    );
  }
  autologin() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.loading = true;
      this._httpService.auth(JSON.parse(localStorage.getItem('currentUser')).username, JSON.parse(localStorage.getItem('currentUser')).password).subscribe(
        result => {
          this.error = false;
          this.autenticated = true;
          this.nome = JSON.parse(localStorage.getItem('currentUser')).nome;
          this.nameRole = JSON.parse(localStorage.getItem('currentUser')).nameRole;
        },
        error => {
          this.error = true;
          this.loading = false;
        }
      );
      this.load();
    }
  }
  login() {
    this.loading = true;
    this._httpService.auth(this.username, this.password).subscribe(
      result => {
        this.error = false;
        this.autenticated = true;
        this.nome = JSON.parse(localStorage.getItem('currentUser')).nome;
        this.nameRole = JSON.parse(localStorage.getItem('currentUser')).nomeRole;
        let myContainer = <HTMLElement>document.querySelector("#notif");
        myContainer.innerHTML = '<div class="alert alert-success"><strong>Login</strong> Bem-Vindo ' + this.nome + '</div>';
        setTimeout(() => { myContainer.innerHTML = '' }, 3000);
      },
      error => {
        this.error = true;
        this.loading = false;
        let myContainer = <HTMLElement>document.querySelector("#notif");
        myContainer.innerHTML = '<div class="alert alert-danger"><strong>Login</strong> ' + error + '</div>';
        setTimeout(() => { myContainer.innerHTML = '' }, 3000);
      }
    );
    this.load();
  }
  load() {
    this.nameRole = "";
    var user_data = JSON.parse(localStorage.getItem('currentUser'));
    if (user_data != null) {
      this.nameRole = user_data.nameRole;
    }
    // this.login.getRole();
  }
  logout() {
    this._httpService.logout();
    this.autenticated = false;
    this.loading = false;
    let myContainer = <HTMLElement>document.querySelector("#notif");
    myContainer.innerHTML = '<div class="alert alert-warning"><strong>Logout</strong> Efectuado com Sucesso</div>';
    setTimeout(() => { myContainer.innerHTML = '' }, 3000)
    this.router.navigate(['home']);
    this.load();
  }
}
