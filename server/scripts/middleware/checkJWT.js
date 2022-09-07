require('dotenv').config();
const jwt = require('jsonwebtoken');

//TODO: Add checkRefreshJWT + change checkJWT name => checkAccessJWT
/**
 * Verify access json web token validity
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkAccessJWT = (req, res, next) => {
	const auth = req.headers.Authorization || req.headers.authorization; //Catch any case

	//Validate authorization type
	if (!auth?.startsWith('Bearer ')) return res.sendStatus(401);

	//Get token from authorization field
	const token = auth.split(' ')[1];

	//Validate token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		//Validation failed
		if (err) return res.sendStatus(403);

		//Fetch decoded username and roles into request
		req.uid = decoded.user.id;
		req.roles = decoded.user.roles; //Used in "checkRoles" to validate them

		next();
	});
};

module.exports = { checkAccessJWT };
