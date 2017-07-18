import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { API } from '../../main';

import { Repair } from './repair';

@Injectable()
export class RepairService {

    headers: Headers;
    options: RequestOptions;
    apiUrl = API.url+API.port;  // URL to web api

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append("Authorization", "Basic " + btoa(JSON.parse(localStorage.getItem('currentUser')).username + ":" + JSON.parse(localStorage.getItem('currentUser')).password));
        this.options = new RequestOptions({ headers: this.headers });
    }
    
    info(id:number, repair:number): Observable<Repair> {
        return this._http
            .get(this.apiUrl + `/repair/`+ id+'/'+repair, this.options)
            .map((res: Response) => res.json().data)
            .catch(this.handleError);
    }
    
    list(id: number): Observable<Repair[]> {
        return this._http
            .get(this.apiUrl + '/repair/' + id, this.options)
            .map((response: Response) => <Repair[]>response.json().data)
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error || "Server error");
    }

}