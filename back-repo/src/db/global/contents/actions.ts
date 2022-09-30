import { DataSource } from 'typeorm';
import Actions from '../models/Actions';
import { listViews } from './views';

const actions = async (db: DataSource): Promise<void> => {
	const data = [];
	listViews.forEach((item: any, index: number) => {
		if (index !== 10 && index !== 11) {
			data.push({
				name: 'Generar reporte', //se va a utilizar para solo consultar
				id_views: index + 1,
				description: 'Generar los reporte',
			});
		}
	});
	data.push({
		name: 'Cargar Reporte', //se va a utilizar para solo consultar
		id_views: 10,
		description: 'Cargar reporte contracargo',
	});
	//
	const valid = await db.getRepository(Actions).find({ where: data });
	if (!valid.length) await db.getRepository(Actions).save(data);
};

export default actions;
