import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { API } from '../../main';

import { VehicleList } from './list/listvehicle';
import { VehicleInfo } from './info/infovehicle';

@Injectable()
export class VehicleService {

    headers: Headers;
    options: RequestOptions;
    apiUrl = API.url+API.port;  // URL to web api

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append("Authorization", "Basic " + btoa(JSON.parse(localStorage.getItem('currentUser')).username + ":" + JSON.parse(localStorage.getItem('currentUser')).password));
        this.options = new RequestOptions({ headers: this.headers });
    }

    info(id: number): Observable<VehicleInfo> {
        return this._http
            .get(this.apiUrl + `/vehicle/` + id, this.options)
            .map((res: Response) => res.json().data)
            .catch(this.handleError);
    }
    
    list(id: number): Observable<VehicleList[]> {
        return this._http
            .get(this.apiUrl + '/vehicle/' + id + '/user', this.options)
            .map((response: Response) => <VehicleList[]>response.json().data)
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error || "Server error");
    }

}