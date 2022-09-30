import { CarropagoDS, LibrepagoDS, MilpagosDS, SitranDS } from './DataSource';

export const Conections = async () => {
	await SitranDS.initialize();
	console.log('Sitran OK');
	await MilpagosDS.initialize();
	console.log('Milpagos OK');
	await CarropagoDS.initialize();
	console.log('Carropago OK');
	await LibrepagoDS.initialize();
	console.log('Librepago OK');
};
