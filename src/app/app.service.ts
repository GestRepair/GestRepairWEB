﻿import { Injectable, Output, EventEmitter } from "@angular/core";
import { FormsModule }   from '@angular/forms';
import { Http, Response, Headers } from "@angular/http";
import { Auth } from "./auth";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { API } from '../main';
import { Subject } from "rxjs/Subject";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class AppService {

    private readonly apiURL:string;
    public name: string;
	public role: string;
	public idUser: string;
    public roleChange = new ReplaySubject<any>(1);
    
    constructor(private _http: Http){
        // set token if saved in local storage      
        this.apiURL = API.url+API.port;
    }
    /**
     * Aqui é é onde se faz o pedido de autenticação
     * @param username 
     * @param password 
     */
    auth(username: string, password:string): Observable<boolean>{
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Basic " + btoa(username + ":" + password));
        return this._http.post(this.apiURL+'/login',"",{headers:headers})
        .map((res: Response) =>{
            let data =  res.json();
            if (data.result=="ok") {
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({
                    "username":username,
                    "password":password,
                    "idUser":data.data.idUser,
                    "name":data.data.name,
                    "isEmployer":data.data.isEmployer
                }));
				this.name = data.data.name;
				this.idUser = data.data.numUtilizador;
				this.role = data.data.isEmployer;

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        }).catch(this.handleError);
    }
  
    public getRole(){
        this.roleChange.next(this.role);
    }
    
    public getSubject(): Observable<any> {
        return this.roleChange.asObservable();
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().message);
    }

    public logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}