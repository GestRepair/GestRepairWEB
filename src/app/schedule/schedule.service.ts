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
	apiUrl = API.url + API.port;

	constructor(private _http: Http) {
		this.headers = new Headers();
		this.headers.append('Content-Type', 'application/json');
		this.headers.append("Authorization", "Basic " + btoa(JSON.parse(localStorage.getItem('currentUser')).username + ":" + JSON.parse(localStorage.getItem('currentUser')).password));
		this.options = new RequestOptions({ headers: this.headers });
	}
	/**
	 * Cria Agendamento
	 * @param data 
	 */
	create(data: Schedule) {
		return this._http.post(this.apiUrl + '/schedule', JSON.stringify(data), this.options)
			.map((response: Response) => response.json())
			.catch(this.handleError);
	}
	/**
	 * Lista os agendamentos
	 * @param id 
	 */
	list(id: number): Observable<Schedule[]> {
		return this._http
			.get(this.apiUrl + '/schedule/' + id, this.options)
			.map((response: Response) => <Schedule[]>response.json().data)
			.catch(this.handleError);
	}
	/**
	 * Mostrar informação do agendamento
	 * @param id 
	 * @param schedule 
	 */
	info(id: number, schedule: number): Observable<Schedule> {
		return this._http
			.get(this.apiUrl + `/schedule/` + id + `/` + schedule, this.options)
			.map((res: Response) => res.json().data)
			.catch(this.handleError);
	}
	/**
	 * Desabilitar Serviço
	 * @param id 
	 */
	disable(id: number) {
		return this._http.get(this.apiUrl + '/schedule/disable/' + id, this.options)
			.map((response: Response) => response.json())
			.catch(this.handleError);
	}
	private handleError(error: Response) {
		return Observable.throw(error.json().message);
	}

}