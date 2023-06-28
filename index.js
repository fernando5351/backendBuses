const app = require('./src/app');

app.listen(app.get('port'), (e) => {
	try {
		// eslint-disable-next-line no-console
		console.log(`🚀 server running on http://localhost:${app.get('port')}`);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(`there was an error in: ${e}`);
	}
});
