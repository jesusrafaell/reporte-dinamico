import { DataSource } from 'typeorm';
import Usuarios from '../models/Usuarios';
import UsuariosXPerfil from '../models/Usuario_Work';

const preDataUser = async (db: DataSource): Promise<void> => {
	const user = await db.getRepository(Usuarios).findOne({ where: { login: 'test' } });

	if (!user) {
		console.log('no existe el usuario');
		return null;
	}

	const prePerfilesUsuario: UsuariosXPerfil = {
		id_usuario: user, //kpolo
		id_rol: 2, //work
		id_department: 3, //;
	};
	//
	const valid = await db.getRepository(UsuariosXPerfil).find({ where: prePerfilesUsuario });
	if (!valid.length) await db.getRepository(UsuariosXPerfil).save(prePerfilesUsuario);
};

export default preDataUser;
