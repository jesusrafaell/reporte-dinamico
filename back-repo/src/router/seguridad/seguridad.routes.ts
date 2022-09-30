import { Router } from 'express';
import Seguridad, {
	createDepartment,
	dataUserData,
	getPermissions,
	getViews,
	updateDepartments,
	updateUserData,
	updateViews,
} from '../../controller/Seguridad';

const Security: Router = Router();
//
Security.route('/workerSecurity/:id').get(dataUserData).put(updateUserData);
//
Security.route('/department/create').post(createDepartment);

Security.route('/departments/update').put(updateDepartments);
//
Security.route('/permissions/:id_dep/:id_rol').get(getPermissions); //.post(updatePermissions);
//
Security.route('/views/:id_dep').get(getViews).post(updateViews);

Security.route('/worker/all').get(Seguridad.allWorker);

Security.route('/departments/all').get(Seguridad.allDepartment);

Security.route('/roles/all').get(Seguridad.allRoles);

export default Security;
