import { DataSource } from 'typeorm';
import Roles from '../models/Roles';

export const listRoles: Roles[] = [
	{
		name: 'Base',
	},
	{
		name: 'Trabajador',
	},
	{
		name: 'Supervisor',
	},
	{
		name: 'Admin',
	},
];

const roles = async (db: DataSource): Promise<void> => {
	//
	const valid = await db.getRepository(Roles).find({ where: listRoles });
	if (!valid.length) await db.getRepository(Roles).save(listRoles);
};

export default roles;
