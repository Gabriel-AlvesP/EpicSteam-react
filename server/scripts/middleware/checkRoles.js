/**
 * Check if current user has any necessary roles to access the requested content
 * Dependent of checkAccessJWT since it decodes roles
 * from the accessToken and inserts it into request
 *
 * @param  {...any} allowedRoles User roles
 * @returns
 */
const checkRoles = (...allowedRoles) => {
	return (req, res, next) => {
		//Check if user has any roles
		if (!req?.roles) return res.sendStatus(401);

		//Check if user has any of allowed roles
		if (
			!req.roles.map(elem => allowedRoles.includes(elem)).find(eval => !!eval)
		)
			return res.sendStatus(401);

		next();
	};
};

module.exports = checkRoles;
