/**
 * Modelo da autenticação
 */
export interface Auth {
    username: string;
    password: string;
    idUser: number;
    name: string;
    street:string;
    zipcode:string;
    city:string;
    email:string;
    nif: string;
    contact: string;
    isEmployer: number;
}