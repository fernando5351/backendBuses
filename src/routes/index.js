const router =  require('express').Router();

const roleRoute = require('./roleRoute');
const usersRouter = require('./userRoute');

function routerApi(app){
	//http://localhost:300/api/v1/role
  app.use('/api/v1', router);
	router.use('/role', roleRoute);
}

module.exports = routerApi;
