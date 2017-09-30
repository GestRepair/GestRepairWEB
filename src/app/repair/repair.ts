/**
 * Dados da reparação
 */
export interface Repair {
    idRepair: number;
    vehicle: string;
    description: string;
    price: number;
    state: string;
    startDate: string;
    finishDate: string;
    information: string;
    employer: Employer[];
    part: Part[];
}
/**
 * Dados da peça
 */
export interface Part {
    idPart: number;
    namePart: string;
}
/**
 * Dados do funcionário 
 */
export interface Employer {
    idEmployer: number;
    name: string;
    nameService: string;
}