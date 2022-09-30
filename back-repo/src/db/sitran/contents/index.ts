import { SitranDS } from './../../config/DataSource';
import agregadores from './agregadores';
import user from './user';
// init server

SitranDS.initialize()
	.then(async () => {
		console.log('Running PreData');
		await agregadores(SitranDS);
		console.log(1);
		await user(SitranDS);
		console.log(2);
		console.log('Listo');
		process.exit();
	})
	.catch((err) => {
		console.log(err);
		process.exit();
	});
