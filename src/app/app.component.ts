import { Component } from '@angular/core';
import { AppService } from "app/app.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  private username: string;
  private password: string;
  private numUtilizador: number;
  private nome: string;
  private morada: string;
  private codPostal: string;
  private localidade: string;
  private nomeRole: string;
  private email: string;
  private contacto: string;
  private nif: string;
  private loading = false;
  private error = false;
  private autenticated = false;

  constructor(private _httpService: AppService, private router: Router) { }
  ngOnInit() {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      this.loading = true;
      this._httpService.auth(JSON.parse(localStorage.getItem('currentUser')).username, JSON.parse(localStorage.getItem('currentUser')).password).subscribe(
        result => {
          this.error = false;
          this.autenticated = true;
          this.nome = JSON.parse(localStorage.getItem('currentUser')).nome;
          this.nomeRole = JSON.parse(localStorage.getItem('currentUser')).nomeRole;
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
        this.nomeRole = JSON.parse(localStorage.getItem('currentUser')).nomeRole;
        let myContainer = <HTMLElement>document.querySelector("#notif");
        myContainer.innerHTML = '<div class="alert alert-success"><strong>Login</strong> Bem-Vindo ' + this.nome + '</div>';
        setTimeout(() => { myContainer.innerHTML = '' }, 3000);
        //this.router.navigate(['home']);
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
    this.nomeRole = "";
    var user_data = JSON.parse(localStorage.getItem('currentUser'));
    if (user_data != null) {
      this.nomeRole = user_data.nomeRole;
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
