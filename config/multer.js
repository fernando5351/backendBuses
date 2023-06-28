const multer = require('multer');
const path = require('path');

// recibe image
const storage = multer.diskStorage({
	async destination(req, file, img) {
		img(null, path.join(__dirname, '../public/images'));
	},
	filename(req, file, name) {
		name(null, `image${Date.now()}.${file.mimetype.split('/')[1]}`);
	},
});

module.exports = storage;
