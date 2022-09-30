import { DataSource } from 'typeorm';
import ViewsXDepartment from '../models/ViewsXDepartment';
import { listDeparment } from './department';
import { listViews } from './views';

const access_views = async (db: DataSource): Promise<void> => {
	let data = [];

	//Todos tiene vista al home
	listDeparment.forEach((element, index) => {
		data.push({
			id_department: index + 1,
			id_views: 1,
		});
	});

	listViews.forEach((element, index) => {
		if (index !== 0)
			data.push({
				id_department: 3,
				id_views: index + 1,
			});
	});

	//
	const valid = await db.getRepository(ViewsXDepartment).find();

	if (!valid.length) await db.getRepository(ViewsXDepartment).save(data);
};

export default access_views;
