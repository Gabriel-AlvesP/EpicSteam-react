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
	allGames,
	getGame,
	addGame,
	gamePlayers,
	updatePlayers,
	getUserVote,
	voteGame,
} = require('../controllers/games');
const {
	categories,
	getCategory,
	newCategory,
} = require('../controllers/categories');
const { getImage } = require('../controllers/images');
//Models
const roles = require('../models/roles');

//* <-- Public routes -->

//? Authentication
router.post('/signup', signUp);
router.post('/login', signIn);
//? Categories
router.get('/categories', categories);
router.get('/categories/:id', getCategory);
//? Games
router.get('/games', allGames);
router.get('/games/mostPlayed', mostPlayed);
router.get('/games/mostLiked', mostLiked);
router.get('/games/recentlyAdded', recentlyAdded);
router.get('/games/game/:id', getGame);
router.get('/games/game/players/:gameId', gamePlayers);
//game comments,
//? Pictures
router.get('/picture/:image', getImage);

//* <-- Private routes -->

//TODO: use checkRefreshJWT in functions that use refresh token in queries
router.get('/refresh', refreshTokenHandler); //refreshToken
router.get('/logout', logout); //refreshToken
router.get('/users', checkAccessJWT, checkRoles(roles.forumManager), users);
router.post(
	'/games/new',
	checkAccessJWT,
	checkRoles(roles.contentManager, roles.forumManager),
	upload.fields([
		{ name: 'cover', maxCount: 1 },
		{ name: 'banner', maxCount: 1 },
	]),
	addGame
);
router.post(
	'/categories/new',
	checkAccessJWT,
	checkRoles(roles.forumManager, roles.contentManager),
	newCategory
);
router.post('/games/game/players/', checkAccessJWT, updatePlayers);
router.get('/games/game/vote/:gameId', checkAccessJWT, getUserVote);
router.post('/games/game/vote', checkAccessJWT, voteGame);
//router.post('/comment', comment);

module.exports = router;
