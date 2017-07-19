export interface Repair {
    idRepair: number;
    service:string;
    registration:string;
    description: string;
    price: number;
    nameState: string;
    startDate:string;
    finishDate:string;
    information:string;
    employer:string;
    part:Part[];
}
export interface Part {
    idPart:number;
    part:string;
}