const express = require('express');
const router = express.Router();
const { signIn, signUp, logOut } = require('../controllers/auth');
const { users } = require('../controllers/users');
const { refreshTokenHandler } = require('../controllers/refreshToken');
const verifyJWT = require('../middleware/checkJWT');
const roles = require('../models/roles');
const checkRoles = require('../middleware/checkRoles');
const checkJWT = require('../middleware/checkJWT');
// Public routes

router.post('/signup', signUp);
router.post('/login', signIn);
/*router
	.route('/categories')
	.get(requestHandlers.categories)
	.post(verifyJWT, requestHandlers.postCategory);*/
//router.get('/game/:id', requestHandlers.game);

// Private routes

router.get(
	'/refresh',
	checkJWT,
	checkRoles(roles.visitor, roles.contentManager),
	refreshTokenHandler
); //TODO REMOVE and add checkJWT and checkRoles for other private routes
router.get('/logout', logOut);
router.get('/users', verifyJWT, users);
//router.post('/game', requestHandlers.postGame);
//router.post('/comment', requestHandlers.comment);

module.exports = router;
