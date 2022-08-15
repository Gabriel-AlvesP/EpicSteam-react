/**
 * Allowed origins
 */
const whiteList = ['http://localhost:3000'];

/**
 * Fetch cookies credentials requirements
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const allowCredentials = (req, res, next) => {
	if (whiteList.includes(req.headers.origin))
		res.header('Access-Control-Allow-Credentials', true);
	next();
};

/**
 * Cors options configuration
 */
const corsOptions = {
	origin: (origin, callback) => {
		if (whiteList.indexOf(origin) !== -1 || !origin) callback(null, true);
		else callback(new Error('Not allowed by CORS...'));
	},
	optionsSuccessStatus: 200,
};

module.exports = { allowCredentials, corsOptions };
