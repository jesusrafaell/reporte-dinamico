import { options } from '../../controller/Transaccional';

require('dotenv').config();

const { NODE_ENV } = process.env;

interface select {
	key: string;
	query: string;
}

export interface typeTrans {
	Aprobados: boolean;
	Rechazos: boolean;
	CierreDeLote: boolean;
	Reversos: boolean;
}

export const selects: select[] = [
	{ key: 'Afiliado', query: `right(card_acceptor_id_code, 9) as Afiliado` },
	{ key: 'Descripcion', query: `card_acceptor_name_loc as Descripcion` },
	{ key: 'Terminal', query: `card_acceptor_term_id as Terminal` },
	{ key: 'Monto', query: `sum(source_node_amount_requested/100) as Monto` },
	{ key: 'Msg_type', query: `msg_type as Msg_type` },
	{ key: 'Cod_resp', query: `rsp_code_req_rsp as Cod_Resp` },
	{ key: 'State', query: `state as State` },
	{
		key: 'Tp_Tx',
		query: `case sink_node when ''sktandem'' then ''Credito'' when ''sktandem1'' then ''Tebca  '' else ''Débito '' end as Tp_Tx`,
	},
	{ key: 'Cantidad', query: `count(*) as Cantidad` },
];

export const FormatQuery = (tipo: string, organizationOption: string, monthoption: string): string => {
	const tipoSol = options.findIndex((val) => val === tipo) + 1;
	const firstDate: string = `${monthoption}-01 00:00:00.000`;
	const date = new Date(firstDate); //date
	const last_date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	const lastDay = `${last_date.getFullYear()}-${last_date.getMonth() + 1}-${last_date.getDate()} 23:59:59.999`;

	return /* sql */ /*sql*/ `
	EXEC ${
		NODE_ENV === 'prod' ? 'POSTILION_7018' : 'PRUEBA_7218'
	}.tm_trans_base.dbo.SP_RD_transaccion '${firstDate}', '${lastDay}', '${organizationOption}', '${tipoSol}'
        `;
};
