import { DataSource } from 'typeorm';
import Usuarios from '../models/Usuario';

export const preUsuario: Usuarios = {
	login: 'test',
	password: 'cUIdDUd5MxlsgKs0biXIJA==',
	name: 'reporte dinamico',
	id_type: 'V',
	ident: '12345678',
	email: 'test@correo.com',
	estatus: 1,
};

const preUser = async (db: DataSource): Promise<void> => {
	//
	const valid = await db.getRepository(Usuarios).find({ where: { login: preUsuario.login } });
	if (!valid.length) await db.getRepository(Usuarios).save(preUsuario);
};

export default preUser;
