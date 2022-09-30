import { Request, Response } from 'express';
import * as path from 'path';
//
import { MilpagosDS } from '../../db/config/DataSource';
import abono_cliente_rechazado from '../../db/global/models/abono_cliente_rechazado';
import monto_pago_proveedor from '../../db/global/models/monto_pago_proveedor';
import saveLogs from '../logs';

interface Lote {
	Terminal: string;
	'Monto de Cuota ($)': number;
}

interface body {
	lote: string;
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

const AbonoClienteRechazado = {
	async upFile(req: Request<body>, res: Response<msg>) {
		try {
			if (!req.body.lote && !req.body.nameFile) throw { message: 'No se encontro ningun lote' };

			const lote: any[] = JSON.parse(req.body.lote);

			if (!lote.length) throw { message: 'No se encontro ningun lote' };
			// const iso = new Date().toISOString().split('T')[0];
			const iso = new Date();

			const dateCargo = await MilpagosDS.getRepository(abono_cliente_rechazado).findOne({
				where: { createdAt: iso },
			});

			if (dateCargo) {
				throw { message: 'El dia de hoy ya se cargo un archvio para abono a clientes rechazados' };
			}

			let totalTerm = lote.length;
			let totalSum = 0;

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
				totalSum += monto;
			});

			for (let i = 0; i < lote.length; i++) {
				let item = lote[i];
				//console.log('item', item);
				let term = item[Object.keys(item)[0]];
				let monto: number = item[Object.keys(item)[1]];
				if (term) {
					const terminal = await MilpagosDS.getRepository(monto_pago_proveedor).findOne({
						where: { TERMINAL: term },
					});
					if (terminal) {
						//update
						let suma = terminal.MONTO + monto;

						//console.log(item.Terminal, 'sumar: ', terminal.MONTO_COBRA, '+', item['Monto de Cuota ($)'], ':', suma);
						await MilpagosDS.getRepository(monto_pago_proveedor).update(terminal.ID, {
							MONTO: suma,
						});
					} else {
						await MilpagosDS.getRepository(monto_pago_proveedor).save({
							TERMINAL: term,
							MONTO: monto,
						});
					}
				}
			}

			const fileAbonoClienteRechazado = await MilpagosDS.getRepository(abono_cliente_rechazado).save({
				name: req.body.nameFile,
			});

			const { email }: any = req.headers.token;
			await saveLogs(
				email,
				'POST',
				req.url,
				`Subio un archivo de abono clientes rechazado id: [${fileAbonoClienteRechazado.id}]`
			);

			res.status(200).json({ message: 'File Saved', info: { totalTerm, totalSum } });
		} catch (err) {
			console.log(err);
			res.status(400).json(err);
		}
	},
};

export default AbonoClienteRechazado;
