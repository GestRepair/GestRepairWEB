import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { API } from '../../main';

import { Budget } from './budget';

@Injectable()
export class BudgetService {

    headers: Headers;
    options: RequestOptions;
    apiUrl = API.url + API.port;  // URL to web api

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append("Authorization", "Basic " + btoa(JSON.parse(localStorage.getItem('currentUser')).username + ":" + JSON.parse(localStorage.getItem('currentUser')).password));
        this.options = new RequestOptions({ headers: this.headers });
    }
    /**
     * Faz um pedido à API para obter a informação do orçamento
     * @param id 
     * @param budget 
     */
    info(id: number, budget: number): Observable<Budget> {
        return this._http
            .get(this.apiUrl + `/budget/` + id + '/' + budget, this.options)
            .map((res: Response) => res.json().data)
            .catch(this.handleError);
    }
    /**
     * Aprova ou não aprova os orçamentos
     * @param id 
     * @param data 
     */
    aproved(id: number, data: number): Observable<Budget> {
        return this._http.put(this.apiUrl + '/budget/' + id + '/aprove/', JSON.stringify({ state: data }), this.options)
            .map((res: Response) => res.json().data)
            .catch(this.handleError);
    }
    /**
     * Faz um pedido à api para mostrar a listagem de orçamentos por orçamento
     * @param id 
     */
    list(id: number): Observable<Budget[]> {
        return this._http
            .get(this.apiUrl + '/budget/' + id, this.options)
            .map((response: Response) => <Budget[]>response.json().data)
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error || "Server error");
    }

}