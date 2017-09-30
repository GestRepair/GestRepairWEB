import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { API } from '../../main';

import { User } from './user';
import { ChangePassword } from "app/user/changePassword/changePassword";


@Injectable()
export class UserService {
    headers: Headers;
    options: RequestOptions;
    apiUrl = API.url+API.port;  // URL to web api

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        if(localStorage.getItem('currentUser')){
            this.headers.append("Authorization", "Basic " + btoa(JSON.parse(localStorage.getItem('currentUser')).username + ":" + JSON.parse(localStorage.getItem('currentUser')).password));
        }
        this.options = new RequestOptions({ headers: this.headers });
    }
    /**
     * Cria utilizador
     * @param data 
     */
    create(data: User) {
        return this._http.post(this.apiUrl + '/user',JSON.stringify(data),this.options)
            .map((response: Response) =>response.json())
            .catch(this.handleError);
    }
    /**
     * Envia o email de modo a fazer o pedido para ativar a conta
     * @param email 
     */
    activate(email: string) {
        return this._http.post(this.apiUrl + '/user/'+ email +'/active',this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     * Ativa a conta
     * @param email 
     * @param token 
     */
    active(email:string, token:string) {
        return this._http.get(this.apiUrl + '/user/'+ email +'/active/'+token,this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     * Edita o utilizador
     * @param data 
     * @param num 
     */
    edit(data: User, num: number) {
        return this._http.put(this.apiUrl + '/user/' + num, JSON.stringify(data), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     * Mostra a informação do utilizador
     * @param num 
     */
    info(num: number): Observable<User> {
        return this._http
            .get(this.apiUrl + `/user/` + num, this.options)
            .map((res: Response) => res.json().data)
            .catch(this.handleError);
    }
    /**
     * Faz o pedido de recuperação de password
     * @param email 
     */
    rec(email: string) {
        return this._http.post(this.apiUrl + '/user/'+email+'/recovery',this.options)
            .map((response: Response) =>response.json())
            .catch(this.handleError);
    }
    /**
     * Faz a recuperação da password
     * @param data 
     * @param email 
     * @param token 
     */
    recemail(data:string,email: string,token:string) {
        return this._http.put(this.apiUrl + '/user/'+email+'/recovery/'+token,JSON.stringify({password:data}),this.options)
            .map((response: Response) =>response.json())
            .catch(this.handleError);
    }
    /**
     * Altera a password
     * @param data 
     * @param olddata 
     * @param id 
     */
    changePass(data:string,olddata:string,id: number){
        return this._http.put(this.apiUrl + '/chpass/'+id,JSON.stringify({newPassword:data,oldPassword:olddata}),this.options)
            .map((response: Response) =>response.json())
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error || "Server error");
    }

}