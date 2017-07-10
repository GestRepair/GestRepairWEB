import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { API } from '../../../../main';

import { UserEdit } from './edit';

@Injectable()
export class UserEditService {

    apiUrl = API.url;;  // URL to web api

    constructor(private _http: Http) { }

    edit(data: UserEdit,num: number) {
        console.log(data);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Basic " + btoa(JSON.parse(localStorage.getItem('currentUser')).username + ":" + JSON.parse(localStorage.getItem('currentUser')).password));
        return this._http.put(this.apiUrl + '/user/'+num, JSON.stringify(data), { headers: headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || "Server error");
    }

}