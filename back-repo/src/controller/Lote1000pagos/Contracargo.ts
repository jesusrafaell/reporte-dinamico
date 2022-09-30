import { Request, Response } from 'express';
import * as path from 'path';
import { MilpagosDS } from './../../db/config/DataSource';
//
import contra_cargo from '../../db/global/models/contra_cargo';
import Historico_Contracargo from '../../db/global/models/Historico_Contracargo';
import { FormatQuery, selects } from '../../functions/Lote1000pagos/Contracargo';
import saveLogs from '../logs';

interface QueryContracargo {
	AFILIADO: string;
	TERMINAL: string;
	RIF: string;
	NOMBRE: string;
	MONTO_DISPUTA: string;
	MONTO_TRANSADO: string;
	MONTO_DESCONTADO: string;
	MONTO_PENDIENTE: string;
	MONTO_ABONAR: string;
	FECHA_EJECUCION: string;
}

interface Lote {
	Terminal: string;
	'Monto de Cuota ($)': number;
}

interface body {
	lote: string;
}

interface bodyContra {
	fecha: string;
}

interface Querys {
	init: string;
	end: string;
}

interface msg {
	message: string;
	info?: any;
}

export const base: string = path.resolve('static');

export default {
	async upFile(req: Request<body>, res: Response<msg>) {
		try {
			if (!req.body.lote && !req.body.nameFile) throw { message: 'No se encontro ningun lote' };

			const lote: any[] = JSON.parse(req.body.lote);

			if (!lote.length) throw { message: 'No se encontro ningun lote' };
			// const iso = new Date().toISOString().split('T')[0];
			const iso = new Date();

			const dateCargo = await MilpagosDS.getRepository(contra_cargo).findOne({
				where: { createdAt: iso },
			});

			if (dateCargo) {
				throw { message: 'El dia de hoy ya se cargo un archivo de ContraCargo' };
			}

			lote.forEach((item: any, index: number) => {
				let term = item[Object.keys(item)[0]];
				let monto: number = item[Object.keys(item)[1]];
				//console.log(term, monto);
				if (term.length !== 8) {
					throw { message: `Tamaño del terminal ${term} invalido, registro ${index + 2}` };
				}
				if (!monto) {
					throw { message: `Terminal: ${term} el monto es 0 o esta vacio, registro ${index + 2}` };
				}
			});

			for (let i = 0; i < lote.length; i++) {
				let item = lote[i];
				//console.log('item', item);
				let term = item[Object.keys(item)[0]];
				let monto: number = item[Object.keys(item)[1]];
				if (term) {
					const terminal = await MilpagosDS.getRepository(Historico_Contracargo).findOne({
						where: { TERMINAL: term },
					});
					if (terminal) {
						//update
						let suma = terminal.MONTO_COBRA + monto;

						//console.log(item.Terminal, 'sumar: ', terminal.MONTO_COBRA, '+', item['Monto de Cuota ($)'], ':', suma);
						await MilpagosDS.getRepository(Historico_Contracargo).update(terminal.ID, {
							MONTO_COBRA: suma,
						});
					} else {
						await MilpagosDS.getRepository(Historico_Contracargo).save({
							TERMINAL: term,
							MONTO_COBRA: monto,
							MONTO_PAGO: 0,
						});
					}
				}
			}

			const fileContracargo = await MilpagosDS.getRepository(contra_cargo).save({
				name: req.body.nameFile,
			});

			const { email }: any = req.headers.token;
			await saveLogs(email, 'POST', req.url, `Subio un archivo de contracardo id: [${fileContracargo.id}]`);

			res.status(200).json({ message: 'File Saved' });
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},

	async all(req: Request<any, msg, body, Querys>, res: Response<msg>) {
		try {
			const { init, end } = req.query;

			// formatear SP a ejecutar
			const sql = FormatQuery(init, end);

			// ejecucion del querys ya formateado
			const info: QueryContracargo[] | [] = await MilpagosDS.query(sql);
			//console.log(info);

			// retornar data al cliente
			res.status(200).json({ message: 'reporte exitoso', info });
		} catch (err) {
			//console.log('err', err);
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

			res.status(200).json({ message: 'columnas enviadas', info });
		} catch (err) {
			res.status(400).json(err);
		}
	},

	async execContracargo(req: Request<any, msg, bodyContra, Querys>, res: Response<msg>) {
		try {
			if (!req.body.fecha) throw { message: 'fecha invalida' };
			const { fecha } = req.body;
			//console.log(fecha);

			const date = new Date(fecha).toISOString().split('T')[0];

			//console.log('Ejecutar contracargo el dia ', date);
			//const SP_contracargo: any = await MilpagosDS.query(`EXEC sp_contracargos '${date}'`);
			const SP_contracargo: any = await MilpagosDS.query(`EXEC sp_contracargos '${date}'`);

			//console.log('Respuesta sp -> ', SP_contracargo);

			const { email }: any = req.headers.token;
			await saveLogs(email, 'GET', req.url, `Ejecutado contracargo`);

			res.status(200).json({ message: 'contracargo ejecutado', info: { ok: true, line: 11, fecha: date } });
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},
};
