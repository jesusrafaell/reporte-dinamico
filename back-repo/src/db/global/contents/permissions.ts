import { DataSource } from 'typeorm';
import Permissions from '../models/Permissions';
//

const permissions = async (db: DataSource): Promise<void> => {
	// let data: Permissions[] = [
	// 	{
	// 		id_department: 2,
	// 		id_rol: 2, //work
	// 		id_action: 2, //crear fm
	// 	},
	// ];

	const valid = await db.getRepository(Permissions).find();
	//if (!valid.length) await db.getRepository(Permissions).save(data);
};

export default permissions;
