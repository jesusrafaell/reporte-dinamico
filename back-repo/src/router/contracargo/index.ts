import { Application } from 'express';
import ContracargoRoutes from './contracargo.routes';

//
export default (app: Application) => {
	app.use('/contracargo', ContracargoRoutes);
	// alto jalabola, cambiar este V endpoint para 'contracargo'
	app.use('/1000pagos', ContracargoRoutes);
};
