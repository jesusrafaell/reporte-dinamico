import { CarropagoDS } from './../../config/DataSource';
import access_views from './access.views';
import actions from './actions';
import department from './department';
import roles from './roles';
import preUser from './user';
import preDataUser from './usuariosPerfil';
import views from './views';
// init server

CarropagoDS.initialize()
	.then(async () => {
		console.log('Running PreData');
		await department(CarropagoDS);
		console.log(1);
		await roles(CarropagoDS);
		console.log(2);
		await views(CarropagoDS);
		console.log(3);
		await actions(CarropagoDS);
		console.log(4);
		await access_views(CarropagoDS);
		console.log(5);
		//await permissions(CarropagoDS);
		console.log(6);
		await preUser(CarropagoDS);
		console.log(7);
		await preDataUser(CarropagoDS);
		console.log('Listo');
		process.exit();
	})
	.catch((err) => {
		console.log(err);
		process.exit();
	});
