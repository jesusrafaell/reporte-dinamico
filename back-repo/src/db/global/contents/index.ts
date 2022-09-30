import { MilpagosDS } from '../../config/DataSource';
import access_views from './access.views';
import actions from './actions';
import department from './department';
import roles from './roles';
import preUser from './user';
import preDataUser from './usuariosPerfil';
import views from './views';
// init server

MilpagosDS.initialize()
	.then(async () => {
		console.log('Running PreData');
		await department(MilpagosDS);
		console.log(1);
		await roles(MilpagosDS);
		console.log(2);
		await views(MilpagosDS);
		console.log(3);
		await actions(MilpagosDS);
		console.log(4);
		await access_views(MilpagosDS);
		console.log(5);
		//await permissions(MilpagosDS);
		console.log(6);
		await preUser(MilpagosDS);
		console.log(7);
		await preDataUser(MilpagosDS);
		console.log('Listo');
		process.exit();
	})
	.catch((err) => {
		console.log(err);
		process.exit();
	});
