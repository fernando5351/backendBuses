const express =  require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const routerApi = require('./routes');
const boom = require('@hapi/boom');
const multer = require('multer');
const storage = require('../config/multer')
const path = require('path');
const { logErrors, ormErrorHandler, boomErrorHandler, errorHandler } = require('../middlewares/errorHandler')

//initialization
const app = express();

//config
app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(multer({storage}).single('file'));

//middlewar
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(boom.unauthorized('Access denied due to CORS security restrictions')));
    }
  }
}
app.use(cors(options));
require('./utils');

//routes
routerApi(app);

//middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

//public files
app.use(express.static(path.join(__dirname, "../public")));

module.exports = app;
