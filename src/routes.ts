import express from 'express';
import { Request, Response } from 'express';

const routes = express.Router();

routes.get('/', (request:Request, response:Response) => response.send('Hello world'));

export default routes;