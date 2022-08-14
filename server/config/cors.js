/**
 * Allowed origins
 */
const whiteList = ['http://localhost:3000'];

/**
 * Cors options configuration
 */
const corsOptions = {
	origin: function (origin, callback) {
		//callback(null, true); //REST test
		if (whiteList.indexOf(origin) !== -1) callback(null, true);
		else callback(new Error('Not allowed by CORS...'));
	},
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
