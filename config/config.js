const config = {
    env: process.env.NODE_ENV || 'dev',
    PORT: process.env.PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT
};

// console.log(config.PORT + ' => port');
// console.log(config.dbUser + ' => dbUser');
// console.log(config.dbPassword + ' => dbPassword');
// console.log(config.dbName + ' => dbName');
// console.log(config.dbHost + ' => dbHost');
// console.log(config.dbPort + ' => dbPort');

module.exports = { config };
