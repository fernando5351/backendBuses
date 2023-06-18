const express =  require('express');
const cors = require('cors');
const port = process.env.PORT || 9000;
const routerApi = require('./routes');
const boom = require('@hapi/boom');

//initialization
const app = express();

//config
app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middlewar
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(boom.forbidden('Access denied due to CORS security restrictions')));
    }
  }
}
app.use(cors(options));

//routes
routerApi(app);

//middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
