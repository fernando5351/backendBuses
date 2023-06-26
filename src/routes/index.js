const router =  require('express').Router();

const roleRoute = require('./roleRoute');
const usersRouter = require('./userRoute');
const AuthRouter = require('./authRoute');

function routerApi(app){
	//http://localhost:300/api/v1/user/register
  app.use('/api/v1', router);
	router.use('/role', roleRoute);
	router.use('/user', usersRouter);
	router.use('/auth', AuthRouter);
}

module.exports = routerApi;
