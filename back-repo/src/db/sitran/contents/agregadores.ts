import { DataSource } from 'typeorm';
import Agregadores from '../models/Agregador';

export const listAgregadores: Agregadores[] = [
	{
		//1
		name: 'Carropago',
		key: 1,
	},
	{
		//2
		name: 'Milpagos',
		key: 2,
	},
	{
		//3
		name: 'Librepago',
		key: 3,
	},
];

const agregadores = async (db: DataSource): Promise<void> => {
	//
	const valid = await db.getRepository(Agregadores).find({ where: listAgregadores });
	if (!valid.length) await db.getRepository(Agregadores).save(listAgregadores);
};

export default agregadores;
