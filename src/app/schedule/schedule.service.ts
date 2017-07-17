import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { API } from '../../main';

import { Schedule } from './schedule';

@Injectable()
export class ScheduleService {

	headers: Headers;
	options: RequestOptions;
	apiUrl = API.url+API.port;
	
	constructor(private _http: Http) {
		this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        if(localStorage.getItem('currentUser')){
            this.headers.append("Authorization", "Basic " + btoa(JSON.parse(localStorage.getItem('currentUser')).username + ":" + JSON.parse(localStorage.getItem('currentUser')).password));
        }
		this.options = new RequestOptions({ headers: this.headers });
	}
	create(data: Schedule) {
        console.log(data);
        return this._http.post(this.apiUrl + '/schedule', JSON.stringify(data),this.options)
            .map((response: Response) => response.json())
			.catch(this.handleError);
    }
	
	private handleError(error: Response) {
		return Observable.throw(error.json().message);
	}

}