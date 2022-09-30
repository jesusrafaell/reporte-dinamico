// import {UserController} from "./controller/UserController";

import CancelarCuotas from './controller/CancelarCuotas';

export const oldRoutes: any[] = [
	{
		method: 'post',
		route: '/cancelar_cuotas',
		controller: CancelarCuotas,
		action: 'all',
	},
	{
		method: 'get',
		route: '/cancelar_cuotas/keys',
		controller: CancelarCuotas,
		action: 'keys',
	},
	{
		method: 'put',
		route: '/cancelar_cuotas/cuota',
		controller: CancelarCuotas,
		action: 'update',
	},
	{
		method: 'get',
		route: '/dicom',
		controller: CancelarCuotas,
		action: 'dicom',
	},
];
