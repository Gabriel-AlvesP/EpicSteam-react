const express = require('express');
const router = express.Router();
const { signIn, signUp, logout } = require('../controllers/auth');
const { users } = require('../controllers/users');
const { refreshTokenHandler } = require('../controllers/refreshToken');
const roles = require('../models/roles');
const checkRoles = require('../middleware/checkRoles');
const checkJWT = require('../middleware/checkJWT');
// Public routes

router.post('/signup', signUp);
router.post('/login', signIn);
//router.get('/game/:id', getGame);

/*router
	.route('/categories')
	.get(categories)
	.post(checkJWT, checkRoles(roles.contentManager), postCategory);*/
//router.get('/game/:id', game);

// Private routes

router.get('/refresh', refreshTokenHandler);
router.get('/logout', logout);
router.get('/users', checkJWT, checkRoles(roles.forumManager), users);
//router.post('/game', requestHandlers.postGame);
//router.post('/comment', requestHandlers.comment);

module.exports = router;
