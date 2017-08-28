export interface Repair {
    idRepair: number;
    registration:string;
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
    part:string;
}
export interface Employer {
    idEmployer:number;
    nameEmployer:string;
    nameService:string;
}