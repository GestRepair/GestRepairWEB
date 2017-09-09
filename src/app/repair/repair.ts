export interface Repair {
    idRepair: number;
    vehicle:string;
    description: string;
    price: number;
    state: string;
    startDate:string;
    finishDate:string;
    information:string;
    employer:Employer[];
    part:Part[];
}
export interface Part {
    idPart:number;
    namePart:string;
}
export interface Employer {
    idEmployer:number;
    name:string;
    nameService:string;
}