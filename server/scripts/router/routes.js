const express = require('express');
const router = express.Router();
const requestHandlers = require('../requests');

// GET
router.get('/users', requestHandlers.users);

// POST
router.post('/signup', requestHandlers.signUp);

router.post('/login', requestHandlers.signIn);

module.exports = router;
