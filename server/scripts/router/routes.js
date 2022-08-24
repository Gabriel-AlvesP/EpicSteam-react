const express = require('express');
const router = express.Router();
const { signIn, signUp, logout } = require('../controllers/auth');
const { users } = require('../controllers/users');
const { refreshTokenHandler } = require('../controllers/refreshToken');
const {
	mostPlayed,
	mostLiked,
	recentlyAdded,
	addGame,
} = require('../controllers/games');
const { categories } = require('../controllers/categories');
const roles = require('../models/roles');
const checkRoles = require('../middleware/checkRoles');
const checkJWT = require('../middleware/checkJWT');
const { upload } = require('../middleware/multer');
// Public routes

//Authentication
router.post('/signup', signUp);
router.post('/login', signIn);
//Games|Posts
router.get('/games/mostPlayed', mostPlayed);
router.get('/games/mostLiked', mostLiked);
router.get('/games/recentlyAdded', recentlyAdded);
//router.get('/game/:id', getGame);

// Private routes

router.get('/refresh', refreshTokenHandler);
router.get('/logout', logout);
router.get('/users', checkJWT, checkRoles(roles.forumManager), users);
router.get(
	'/categories',
	/* 	checkJWT,
	checkRoles(roles.forumManager, roles.contentManager), */
	categories
);
router.post(
	'/games/new',
	checkJWT,
	checkRoles(roles.contentManager, roles.forumManager),
	upload.single('image'),
	addGame
);

//router.post('/game', checkJWT, checkRoles([roles.forumManager, roles.contentManager]),requestHandlers.postGame);
//router.post('/comment', requestHandlers.comment);

module.exports = router;
