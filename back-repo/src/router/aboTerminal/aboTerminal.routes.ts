import { Router } from 'express';
import aboterminal from '../../controller/aboterminal';

const AboTerminal: Router = Router();

AboTerminal.route('').post(aboterminal.all);

AboTerminal.route('/keys').get(aboterminal.keys);

export default AboTerminal;
