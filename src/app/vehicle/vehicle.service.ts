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
    mess: String;
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
     * Envia os dados para a API para criar a viatura
     * @param data 
     */
    create(data: CreateVehicle) {
        return this._http.post(this.apiUrl + '/vehicle/' + JSON.parse(localStorage.getItem('currentUser')).idUser, JSON.stringify(data), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     * Caso exista associa a viatura ao utilizador
     * @param data 
     */
    add(data: string) {
        return this._http.post(this.apiUrl + '/vehicle/exists/' + JSON.parse(localStorage.getItem('currentUser')).idUser, JSON.stringify({ vehicle: data }), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     * Desativa Viatura
     * @param data 
     */
    dis(data: number) {
        let id = JSON.parse(localStorage.getItem('currentUser')).idUser;
        let obj = JSON.stringify({ user: id, vehicle: data });
        console.log(obj);
        return this._http.put(this.apiUrl + '/vehicle/disable', obj, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     * Caso a viatura já tenha uma relação altera o valor isActive da base de dados para 1
     * @param data 
     */
    up(data: string) {
        return this._http.put(this.apiUrl + '/vehicle/exists/' + JSON.parse(localStorage.getItem('currentUser')).idUser, JSON.stringify({ vehicle: data }), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     * Verifica se a viatura existe
     * @param data 
     */
    verify(data: string) {
        return this._http.post(this.apiUrl + '/vehicle/exists', JSON.stringify({ vehicle: data }), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     *  Verifica se a viatura tem donos
     * @param data
     */
    owner(data: string) {
        return this._http.post(this.apiUrl + '/vehicle/exists/user', JSON.stringify({ vehicle: data }), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     *  Verifica se a viatura não tem donos
     * @param data 
     */
    nowner(data: string) {
        return this._http.post(this.apiUrl + '/vehicle/exists/nuser', JSON.stringify({ vehicle: data }), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    nuowner(data: string, id:number) {
        return this._http.post(this.apiUrl + '/vehicle/exists/user/'+id, JSON.stringify({ vehicle: data }), this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
    /**
     * Mostra os detalhes da viatura
     * @param id 
     * @param vehicle 
     */
    info(id: number, vehicle: number): Observable<Vehicle> {
        return this._http
            .get(this.apiUrl + `/vehicle/` + id + '/' + vehicle, this.options)
            .map((res: Response) => res.json().data)
            .catch(this.handleError);
    }
    /**
     * Mostra a lista de Marcas
     */
    listBrand(): Observable<Brand[]> {
        return this._http
            .get(this.apiUrl + '/vehicle/brand', this.options)
            .map((response: Response) => <Brand[]>response.json().data)
            .catch(this.handleError);
    }
    /**
     * Mostra a lista de modelos
     * @param id 
     */
    listModel(id: number): Observable<Model[]> {
        return this._http
            .get(this.apiUrl + '/vehicle/' + id + '/model', this.options)
            .map((response: Response) => <Model[]>response.json().data)
            .catch(this.handleError);
    }
    /**
     * Mostra a lista de combustíveis
     */
    listFuel(): Observable<Fuel[]> {
        return this._http
            .get(this.apiUrl + '/vehicle/fuel', this.options)
            .map((response: Response) => <Fuel[]>response.json().data)
            .catch(this.handleError);
    }
    /**
     * Mostra a lista de viaturas
     * @param id 
     */
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