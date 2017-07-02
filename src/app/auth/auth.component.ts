import { Component, Pipe, PipeTransform, OnInit } from "@angular/core";
import { AuthService } from "app/auth/auth.service";
import { Auth } from "./auth";
import { Router } from "@angular/router";


@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent {
  title = 'Login';
  
  private username:string;
  private password: string;
  private numUtilizador:number;
  private nome:string;
  private morada:string;                 
  private codPostal:string; 
  private localidade:string;
  private nomeRole:string;
  private email:string;
  private contacto:string;
  private nif:string;
  private loading = false;
  private error = false;
  private autenticated = false;
  
  
  constructor(private _httpService: AuthService, private router: Router) { }

  ngOnInit() {
    // reset login status
    this._httpService.logout();
    this.autenticated = false;
  }

  login() {
    this.loading = true;
    this._httpService.auth(this.email, this.password).subscribe(
      result => {    
        this.error = false;
        this.autenticated = true;
        this.nome =JSON.parse(localStorage.getItem('currentUser')).nome;
        this.nomeRole =JSON.parse(localStorage.getItem('currentUser')).nomeRole;
        let myContainer = <HTMLElement> document.querySelector("#notif");
        myContainer.innerHTML = '<div class="alert alert-success"><strong>Login</strong> Efectuado com Sucesso</div>';
        setTimeout(() => { myContainer.innerHTML = ''}, 3000);
        this.router.navigate(['home']);
        this.load();
      },
      error => {
        this.error = true;
        this.loading = false;
      }
    );
  }
  load(){
      this.nomeRole="";
      var user_data = JSON.parse(localStorage.getItem('currentUser'));
      if(user_data != null){
          this.nomeRole = user_data.nomeRole;
      }   
      // this.login.getRole();
    }
  logout(){
    this._httpService.logout();
    this.autenticated = false;
    this.loading = false;
    let myContainer = <HTMLElement> document.querySelector("#notif");
    myContainer.innerHTML = '<div class="alert alert-warning"><strong>Logout</strong> Efectuado com Sucesso</div>';
    setTimeout(() => { myContainer.innerHTML = ''}, 3000)
    this.router.navigate(['home']);
    this.load();
  }
}
