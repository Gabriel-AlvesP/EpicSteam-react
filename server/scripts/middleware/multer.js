const multer = require('multer');

/**
 * Multer middleware config implementation
 * Set images/files names and destinations
 */
const storage = multer.diskStorage({
	destination: (req, file, callback) => callback(null, './uploads/images/'), //TODO Banner vs cover?!
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

/**
 * Set multer middleware config
 */
const upload = multer({ storage: storage });

module.exports = { upload };
