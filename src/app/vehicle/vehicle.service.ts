import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { API } from '../../main';

import { Vehicle } from './vehicle';
import { Brand } from './brand';
import { Model } from './model';
import { Fuel } from './fuel';
import { Verify } from './verify';
import { CreateVehicle } from "app/vehicle/create/createVehicle";

@Injectable()
export class VehicleService {
    mess:String;
    headers: Headers;
    options: RequestOptions;
    apiUrl = API.url + API.port;  // URL to web api

    constructor(private _http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append("Authorization", "Basic " + btoa(JSON.parse(localStorage.getItem('currentUser')).username + ":" + JSON.parse(localStorage.getItem('currentUser')).password));
        this.options = new RequestOptions({ headers: this.headers });
    }
    create(data: CreateVehicle) {
        return this._http.post(this.apiUrl + '/vehicle/' + JSON.parse(localStorage.getItem('currentUser')).idUser, JSON.stringify(data), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    add(data: string) {
        console.log(data);
        return this._http.post(this.apiUrl + '/vehicle/exists/' + JSON.parse(localStorage.getItem('currentUser')).idUser, JSON.stringify({vehicle:data}), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    up(data: string) {
        console.log(data);
        return this._http.put(this.apiUrl + '/vehicle/exists/' + JSON.parse(localStorage.getItem('currentUser')).idUser, JSON.stringify({vehicle:data}), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    verify(data: string) {
        return this._http.post(this.apiUrl + '/vehicle/exists',JSON.stringify({vehicle: data}), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    owner(data: string) {
        return this._http.post(this.apiUrl + '/vehicle/exists/user',JSON.stringify({vehicle: data}), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    info(id: number, vehicle: number): Observable<Vehicle> {
        return this._http
            .get(this.apiUrl + `/vehicle/` + id + '/' + vehicle, this.options)
            .map((res: Response) => res.json().data)
            .catch(this.handleError);
    }

    listBrand(): Observable<Brand[]> {
        return this._http
            .get(this.apiUrl + '/vehicle/brand', this.options)
            .map((response: Response) => <Brand[]>response.json().data)
            .catch(this.handleError);
    }
    listModel(id: number): Observable<Model[]> {
        return this._http
            .get(this.apiUrl + '/vehicle/' + id + '/model', this.options)
            .map((response: Response) => <Model[]>response.json().data)
            .catch(this.handleError);
    }
    listFuel(): Observable<Fuel[]> {
        return this._http
            .get(this.apiUrl + '/vehicle/fuel', this.options)
            .map((response: Response) => <Fuel[]>response.json().data)
            .catch(this.handleError);
    }

    list(id: number): Observable<Vehicle[]> {
        
        return this._http
            .get(this.apiUrl + '/vehicle/' + id + '/user', this.options)
            .map((response: Response) => <Vehicle[]>response.json().data)
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.json().error);
    }

}