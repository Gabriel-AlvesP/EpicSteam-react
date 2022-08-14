const express = require('express');
const router = express.Router();
//const requestHandlers = require('../requests');
const verifyJWT = require('../middleware/verifyJWT');
const { signIn, signUp, logOut } = require('../controllers/auth');
const { users } = require('../controllers/users');
const { refreshTokenHandler } = require('../controllers/refreshToken');
// Public routes

router.post('/signup', signUp);
router.post('/login', signIn);
/*router
	.route('/categories')
	.get(requestHandlers.categories)
	.post(verifyJWT, requestHandlers.postCategory);*/
//router.get('/game/:id', requestHandlers.game);

// Private routes

router.get('/refresh', verifyJWT, refreshTokenHandler);
router.get('/logout', verifyJWT, logOut);
router.get('/users', verifyJWT, users);
//router.post('/game', requestHandlers.postGame);
//router.post('/comment', requestHandlers.comment);

module.exports = router;
