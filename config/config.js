require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'dev',
	isProduction: process.env.NODE_ENV === 'production',
	PORT: process.env.PORT,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	jwtSecret: process.env.JWT_SECRET,
	gmailPassword: process.env.GMAIL_PASSWORD,
	gmailUser: process.env.GMAIL_USERNAME,
	recoverySecret: process.env.SECRET_RECOVERY,
};

module.exports = { config };
