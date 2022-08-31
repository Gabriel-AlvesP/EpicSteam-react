const express = require('express');
const router = express.Router();
//Middleware
const checkRoles = require('../middleware/checkRoles');
const { checkAccessJWT } = require('../middleware/checkJWT');
const { upload } = require('../middleware/multer');
//Controllers
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
const { getImage } = require('../controllers/images');
//Models
const roles = require('../models/roles');

//* <-- Public routes -->

//? Authentication
router.post('/signup', signUp);
router.post('/login', signIn);
//? Games
router.get('/games/mostPlayed', mostPlayed);
router.get('/games/mostLiked', mostLiked);
router.get('/games/recentlyAdded', recentlyAdded);
//? Pictures
router.get('/picture/:image', getImage);
//router.get('/game/:id', getGame);

//* <-- Private routes -->

//TODO: use checkRefreshJWT in functions that use refresh token in queries
router.get('/refresh', refreshTokenHandler);
router.get('/logout', logout);
router.get('/users', checkAccessJWT, checkRoles(roles.forumManager), users);
router.get(
	'/categories',
	checkAccessJWT,
	checkRoles(roles.forumManager, roles.contentManager),
	categories
);
router.post(
	'/games/new',
	checkAccessJWT,
	checkRoles(roles.contentManager, roles.forumManager),
	upload.single('image'),
	addGame
);

//router.post('/game', checkJWT, checkRoles([roles.forumManager, roles.contentManager]),requestHandlers.postGame);
//router.post('/comment', requestHandlers.comment);

module.exports = router;
