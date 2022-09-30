import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../../config';
import { multiGetterAxios } from '../../../utilis/multiGetterAxios';

export const seguridad = {
	getAllUser,
	getAllListSeguridad,
	getAllListPermiss,
	savePermiss,
	getAllListViews,
	saveViews,
	updateDepartments,
	createDepartment,
};

export async function getAllUser() {
	try {
		const res = await useAxios.get('/seguridad/worker/all');
		return {
			ok: true,
			users: res.data.info,
		};
	} catch (err) {
		return {
			ok: false,
			err,
		};
	}
}

export async function getAllListSeguridad() {
	try {
		const routes = [`seguridad/departments/all`, `seguridad/roles/all`];

		return multiGetterAxios(routes)
			.then((responses) => {
				// console.log('res', responses);
				return {
					ok: true,
					departments: responses[0].data.info,
					roles: responses[1].data.info,
				};
			})
			.catch((errors) => {
				console.log('error multi axos', errors);
				return {
					ok: false,
				};
			});
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
		};
	}
}

export async function getAllListPermiss(dep: number, rol: number) {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/seguridad/permissions/${dep}/${rol}`);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function savePermiss(dep: number, rol: number, permiss: any[]) {
	try {
		const res: AxiosResponse<any> = await useAxios.post(`/seguridad/permissions/${dep}/${rol}`, permiss);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function getAllListViews(dep: number) {
	try {
		const res: AxiosResponse<any> = await useAxios.get(`/seguridad/views/${dep}`);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function saveViews(dep: number, views: any[]) {
	try {
		const res: AxiosResponse<any> = await useAxios.post(`/seguridad/views/${dep}`, views);
		return {
			ok: true,
			permiss: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function updateDepartments(deps: any) {
	// console.log(deps);
	try {
		await useAxios.put(`/seguridad/departments/update`, { listDeps: deps });
		return {
			ok: true,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}

export async function createDepartment(department: string) {
	try {
		const res: any = await useAxios.post(`/seguridad/department/create`, { nameDep: department });
		return {
			ok: true,
			newDepartment: res.data.info,
		};
	} catch (err: any) {
		Swal.fire('Error', err.response.data.message, 'error');
		return {
			ok: false,
			err,
		};
	}
}
