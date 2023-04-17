import express from 'express'; 
import cors from 'cors'; 
import routes from './routes'; 
import path from 'path'; 
import { errors } from 'celebrate'; 
  
const app = express(); 
  
app.use(cors()); 
//para habilitar a utilização de json nas requisições com body em json 
app.use(express.json()); 
app.use(routes); 
  
// app.use('/uploads', express.static(path.resolve(__dirname, '../', 'uploads'))); 
  
app.use(errors()); 
  
app.listen(3333);