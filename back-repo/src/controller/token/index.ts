import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
//const { HOST, PORT_PROVIDERS } = dotenv;

const dot = config();

const createToken = (id: number, email: string, id_department: number, id_rol: number): string => {
	const token: string = sign({ id, email, idDep: id_department, idRol: id_rol }, process.env.SECRET!, {
		expiresIn: '4h',
	});
	// console.log('token creado', token);
	return token;
};

export default createToken;
