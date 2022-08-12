const express = require('express');
const router = express.Router();
const requestHandlers = require('../requests');

// GET
router.get('/users', requestHandlers.users);

router.get('/categories', requestHandlers.categories);

router.get('/game/:id', requestHandlers.game);

// POST
router.post('/signup', requestHandlers.signUp);

router.post('/login', requestHandlers.signIn);

router.post('/logout', requestHandlers.logout);

router.post('/categories', requestHandlers.categories);

router.post('/game', requestHandlers.postGame);

router.post('/comment', requestHandlers.comment);

module.exports = router;
