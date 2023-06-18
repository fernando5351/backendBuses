const app = require('./src/app');

app.listen(app.get('port'),e=>{
    try {
        console.log('server running on port: ' + app.get('port'));
    } catch (error) {
        console.log('there was an error in: ' + e);
    }
});
