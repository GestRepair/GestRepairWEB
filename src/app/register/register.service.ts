import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { Register } from './register';

@Injectable()
export class RegisterService {

    private apiUrl = '';  // URL to web api

    constructor(private _http: Http) { }

    create(data: Register) {
        console.log(data);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.apiUrl + '/user', JSON.stringify(data), { headers: headers })
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || "Server error");
    }

}