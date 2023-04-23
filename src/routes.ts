import express from 'express';
import { Request, Response } from 'express';

import SkillsController from './controllers/SkillsController';

const routes = express.Router();

const skillsController = new SkillsController();

routes.get('/skills', skillsController.index);
routes.post('/skills', skillsController.create);
routes.get('/skills/:id', skillsController.show);

routes.get('/', (request:Request, response:Response) => response.send('Hello world'));

export default routes;