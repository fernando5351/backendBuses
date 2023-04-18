const express =  require("express");
const port = process.env.PORT || 9000;

//initialization
const app = express();

//config
app.set("port", port);

//middlewares
app.use ( function ( req , res , next ) {
    res.header ( 'Access-Control-Allow-Origin' , "*" ) ;
    res.header ( 'Access-Control-Allow-Methods' , 'GET, PUT, POST, DELETE');
    res.header ( 'Access-Control-Allow-Headers' , "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }
); 


module.exports = app;