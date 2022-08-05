import express from 'express';
import morgan from 'morgan';
import routes from './routes/index'
const server = express();
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(morgan('dev')); // modo de desarrollo 
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);
 // Error catching endware.
 server.use((err, req, res, next) => { 
   const status = err.status || 500;
   const message = err.message || err;
   console.error(message);
   res.status(status).send(message);
});

export default server;
