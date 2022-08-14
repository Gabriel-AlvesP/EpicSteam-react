const express = require('express');
const router = express.Router();
const requestHandlers = require('../requests');
const verifyJWT = require('../middleware/verifyJWT');

// Public routes

router.post('/signup', requestHandlers.signUp);
router.post('/login', requestHandlers.signIn);
router
	.route('/categories')
	.get(requestHandlers.categories)
	.post(verifyJWT, requestHandlers.postCategory);
//router.get('/game/:id', requestHandlers.game);

// Private routes

router.get('/users', verifyJWT, requestHandlers.users);
//router.get('/refresh', requestHandlers.refresh);
router.post('/logout', requestHandlers.logOut);
//router.post('/game', requestHandlers.postGame);
//router.post('/comment', requestHandlers.comment);

module.exports = router;
