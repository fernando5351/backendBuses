const router =  require('express').Router();

const usersRouter = require('./userRoute');

function routerApi(app){
    app.use('/api/v1', router);
    router.use('/user', usersRouter);
}

module.exports = routerApi;
