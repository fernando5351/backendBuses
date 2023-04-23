const config = {
    env: process.env.NODE_ENV || 'dev',
    dbUser: process.env.PGUSER,
    dbPassword: process.env.PGPASSWORD,
    dbName: process.env.PGDATABASE,
    dbHost: process.env.PGHOST,
    dbPort: process.env.PGPORT
};

module.exports = { config };