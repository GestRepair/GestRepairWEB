/**
 * Cria um modelo para listar os detalhes das viaturas
 */
export interface Vehicle {
	idVehicle: number;
	registration: string;
	nameBrand: string;
	nameModel: string;
	displacement: number;
	kilometers: number;
	nameFuel: string;
	fronttiresize: string;
	reartiresize: string;
	date: string;
}