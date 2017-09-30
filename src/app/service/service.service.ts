import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { API } from '../../main';

import { Service } from './service';

@Injectable()
export class ServiceService {

	headers: Headers;
	options: RequestOptions;
	apiUrl = API.url+API.port;
	
	constructor(private _http: Http) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
		this.options = new RequestOptions({ headers: this.headers });
	}
	/**
	 * Lista os serviços
	 */
	list(): Observable<Service[]> {
		return this._http
			.get(this.apiUrl + '/service', this.options)
			.map((response: Response) => <Service[]>response.json().data)
			.catch(this.handleError);
	}
	/**
	 * Mostra os detalhes do serviço
	 * @param num 
	 */
	info(num: number): Observable<Service>  {
        return this._http
			.get(this.apiUrl +'/service/'+num, this.options)
            .map((res: Response) => res.json().data)
            .catch(this.handleError);
    }
	private handleError(error: Response) {
		return Observable.throw(error.json().message);
	}

}