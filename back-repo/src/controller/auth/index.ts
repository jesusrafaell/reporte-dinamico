import { exec } from 'child_process';
import { Request, Response } from 'express';
import * as path from 'path';
import { DataSource } from 'typeorm';
import Permissions from '../../db/global/models/Permissions';
import Usuarios from '../../db/global/models/Usuarios';
import UsuarioXWork from '../../db/global/models/Usuario_Work';
import UsuariosSitran from '../../db/sitran/models/Usuario';
import saveLogs from '../logs';
import createToken from '../token';
import { getDatasource, MilpagosDS, SitranDS } from './../../db/config/DataSource';
import { getPermiss, getViews } from './formatData';
//import { authenticate } from 'ldap-authentication';

function execCommand(cmd: string, password: string) {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
			}
			resolve(stdout ? stdout : stderr);
		});
	});
}

interface body {
	user: string;
	password: string;
}

interface msg {
	message: string;
	user: any;
	access_token?: string;
}

export const base: string = path.resolve('static');

export const login = async (req: Request<body, any>, res: Response<msg>) => {
	try {
		const { user, password } = req.body;
		if (!user || !password) throw { message: 'Debe ingresar usuario y contrasena' };

		const encriptPass = await execCommand(`java -jar java.encript/java.jar ${password}`, password);

		//console.log('pass', encriptPass);

		const resUserDS = await SitranDS.getRepository(UsuariosSitran).findOne({
			where: [
				{
					login: user,
					password: encriptPass as string,
				},
			],
		});

		if (!resUserDS) throw { message: 'Correo o Contraseña incorrecta', code: 401 };

		const DS: DataSource = getDatasource(req.headers.key_agregador);

		const resUser = await DS.getRepository(Usuarios).findOne({
			where: [
				{
					login: resUserDS.login,
					email: resUserDS.email,
				},
			],
		});

		const resWork = await DS.getRepository(UsuarioXWork).findOne({
			where: { id_usuario: resUser },
			relations: ['id_department', 'id_rol', 'id_department.access_views', 'id_department.access_views.id_views'],
		});

		if (!resWork) throw { message: 'Este usuario no tiene acceso a reporte dinamico', code: 401 };

		const { id_rol, id_department: dep }: any = resWork;
		const { access_views, ...id_department }: any = dep;

		if (!id_department.active)
			throw { message: `El departamento de ${id_department.name} esta Bloqueado`, code: 401 };
		const views = getViews(access_views); //obtener lista de vistas

		let permiss: any = [];

		//buscar permisos
		if (id_department.id !== 1) {
			const resPermiss = await DS.getRepository(Permissions).find({
				where: { id_department: id_department.id, id_rol: id_rol.id },
				relations: ['id_action'],
			});
			if (!resPermiss) throw { message: 'Error Access Permisses', code: 400 };

			permiss = getPermiss(resPermiss);

			//console.log(permiss);
		} else {
			//console.log('usuario no posee nigun deparmento');
		}

		//console.log('rol:', id_rol, 'dep:', id_department);

		const token: string = createToken(resUser.id, resUser.email, id_department.id, id_rol.id);

		//save in log
		await saveLogs(resUser.email, 'POST', '/auth/login', `Login de Usuario`);

		const userRes = {
			login: resUserDS.login,
			name: resUserDS.name,
			id_department,
			id_rol,
		};

		const info = {
			user: userRes,
			views,
			permiss,
		};

		res.status(200).json({ message: 'login', ...info, access_token: token });
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
};

export const getLogin = async (req: Request<any, msg, body>, res: Response<msg>) => {
	try {
		const { id, email }: any = req.headers.token;

		const resUser = await MilpagosDS.getRepository(Usuarios).findOne({ where: { id } });

		if (!resUser) throw { message: 'Usuario no existe' };

		const resWork = await MilpagosDS.getRepository(UsuarioXWork).findOne({
			where: { id_usuario: resUser },
			relations: ['id_department', 'id_rol', 'id_department.access_views', 'id_department.access_views.id_views'],
		});

		if (!resWork) throw { message: 'Este usuario no tiene acceso a reporte dinamico', code: 401 };

		const { id_rol, id_department: dep }: any = resWork;
		const { access_views, ...id_department }: any = dep;

		if (!id_department.active)
			throw { message: `El departamento de ${id_department.name} esta Bloqueado`, code: 401 };
		const views = getViews(access_views); //obtener lista de vistas
		let permiss: any = [];

		//buscar permisos
		if (id_department.id !== 1) {
			const resPermiss = await MilpagosDS.getRepository(Permissions).find({
				where: { id_department: id_department.id, id_rol: id_rol.id },
				relations: ['id_action'],
			});
			if (!resPermiss) throw { message: 'Error Access Permisses', code: 400 };

			permiss = getPermiss(resPermiss);
		}

		const userRes = {
			login: resUser.login,
			name: resUser.nombre,
			id_department,
			id_rol,
		};

		const info = {
			user: userRes,
			views,
			permiss,
		};

		res.status(200).json({ message: 'Usuario', ...info });
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
};
