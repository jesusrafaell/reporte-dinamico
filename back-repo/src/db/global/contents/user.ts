import { DataSource } from 'typeorm';
import Usuarios from '../models/Usuarios';

export const preUsuario: Usuarios = {
	login: 'test',
	contrasena: 'cUIdDUd5MxlsgKs0biXIJA==',
	nombre: 'reporte dinamico',
	tipoIdentificacion: 'V',
	identificacion: '12345678',
	email: 'test@correo.com',
	perfilId: 23,
	fechaCreacion: new Date(),
	fechaExpira: new Date(),
	ultimoAcceso: new Date(),
	estatus: 7,
};

const preUser = async (db: DataSource): Promise<void> => {
	//
	const valid = await db.getRepository(Usuarios).find({ where: { login: preUsuario.login } });
	if (!valid.length) await db.getRepository(Usuarios).save(preUsuario);
};

export default preUser;
