const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, './uploads/images/'),
	filename: (req, file, cb) => {
		//TODO: REMOVE
		/* 		const imageName = `${Date.now()}-${file.originalname}`;
		req.body.imagePath = 'uploads/images/' + imageName; */
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

module.exports = { upload };
