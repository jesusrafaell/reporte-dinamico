import { Request, Response } from 'express';
import { dateRang, FormatQuery, selectQuery, selects } from '../functions/history';
import { MilpagosDS } from './../db/config/DataSource';

interface body {
	keys: string[];
}

interface Querys {
	init: string;
	end: string;
}

interface msg {
	message: string;
	info: any;
}

export default {
	async allHistory(req: Request<any, msg, body, Querys>, res: Response<msg>) {
		try {
			// definimos variables
			const { keys } = req.body;

			// console.log('req.', req.query);

			const { init, end, sponsor }: any = req.query;
			// console.log('sponsor', sponsor);

			// formateamos la data
			const Dates = dateRang(init, end);
			const selects = selectQuery(keys);
			const query = FormatQuery({ init, end }, selects, sponsor);

			// console.log('query', query);

			// ejecucion del querys ya formateado
			const info: any = await MilpagosDS.query(query);

			// if (keys.includes('TRANSACCION')) {
			// 	const trans: any = await pool.query(transQuery);
			// }

			// const info: any[] = resp.map((item: any) => {
			// 	Object.keys(item).forEach((key: any) => {
			// 		if (typeof item[key] === 'number') {
			// 			item[key] = 'Bs' + numeral(item[key]).format('0.0,00');
			// 		}
			// 	});

			// 	return item;
			// });

			// retornar data al cliente
			res.status(200).json({ message: 'reporte exitoso', info });
		} catch (err) {
			res.status(400).json(err);
		}
	},

	async keys(req: Request<any, msg, body, Querys>, res: Response<msg>) {
		try {
			let keys: any = {};
			selects.forEach((item: any) => {
				const { key }: any = item;

				keys[key] = key === 'TERMINAL';
			});

			const { TERMINAL, ...resto } = keys;

			const info: any = { TERMINAL, ...resto };

			res.status(200).json({ message: 'reporte exitoso', info });
		} catch (err) {
			res.status(400).json(err);
		}
	},
};
