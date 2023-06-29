const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { engine } = require('express-handlebars');
const cors = require('cors');

const port = process.env.PORT || 3000;
const boom = require('@hapi/boom');
const multer = require('multer');
const path = require('path');
const storage = require('../config/multer');
const routerApi = require('./routes');
const {
	logErrors, ormErrorHandler, boomErrorHandler, errorHandler,
} = require('../middlewares/errorHandler');

// initialization
const app = express();

// config
app.set('port', port);
// template engine
app.set('views', path.join(__dirname, '../public/html'));
app.engine('.hbs', engine({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(multer({ storage }).single('file'));

// middleware
const whitelist = ['https://app.swaggerhub.com/apis-docs/ISAACFERNANDO5351/BusES/1', 'http://localhost:3000'];
const options = {
	origin: (origin, callback) => {
		if (whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error(boom.unauthorized('Access denied due to CORS security restrictions')));
		}
	},
};
app.use(cors(options));
require('./utils/auth');

// routes
routerApi(app);

// public files
app.use(express.static(path.join(__dirname, '../public')));

// middlewares
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
