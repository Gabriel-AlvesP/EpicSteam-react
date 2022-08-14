const express = require('express');
const router = express.Router();
const requestHandlers = require('../requests');

// GET
router.get('/users', requestHandlers.users);

router
	.route('/categories')
	.get(requestHandlers.categories)
	.post(requestHandlers.postCategory);

//router.get('/game/:id', requestHandlers.game);

//router.get('/refresh', requestHandlers.refresh);

// POST
router.post('/signup', requestHandlers.signUp);

router.post('/login', requestHandlers.signIn);

router.post('/logout', requestHandlers.logOut);

//router.post('/game', requestHandlers.postGame);

//router.post('/comment', requestHandlers.comment);

module.exports = router;
