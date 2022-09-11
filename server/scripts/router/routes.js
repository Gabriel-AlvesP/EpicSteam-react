const express = require('express');
const router = express.Router();
//Middleware
const checkOwnership = require('../middleware/checkOwnership');
const checkRoles = require('../middleware/checkRoles');
const { checkAccessJWT } = require('../middleware/checkJWT');
const { upload } = require('../middleware/multer');
//Controllers
const { signIn, signUp, logout } = require('../controllers/auth');
const { users, removeUser, updateUserRole } = require('../controllers/users');
const { refreshTokenHandler } = require('../controllers/refreshToken');
const {
	mostPlayed,
	mostLiked,
	recentlyAdded,
	allGames,
	getGame,
	addGame,
	deleteGame,
	gamePlayers,
	updatePlayers,
	getUserVote,
	voteGame,
} = require('../controllers/games');
const {
	categories,
	getCategory,
	newCategory,
	deleteCategory,
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
router.get('/games/game/players/:id', gamePlayers);
//game comments,
//? Pictures
router.get('/picture/:image', getImage);

//* <-- Private routes -->

//TODO: use checkRefreshJWT in functions that use refresh token in queries
router.get('/refresh', refreshTokenHandler); //refreshToken
router.get('/logout', logout); //refreshToken
router.get('/users', checkAccessJWT, checkRoles(roles.forumManager), users);
router.post(
	'/users',
	checkAccessJWT,
	checkRoles(roles.forumManager),
	updateUserRole
);
router.delete(
	'/users/:id',
	checkAccessJWT,
	checkRoles(roles.forumManager),
	removeUser
);
router.post(
	'/categories/new',
	checkAccessJWT,
	checkRoles(roles.forumManager),
	upload.single('icon'),
	newCategory
);
router.delete(
	'/categories/:id',
	checkAccessJWT,
	checkRoles(roles.forumManager),
	deleteCategory
);
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
router.post('/games/game/players/', checkAccessJWT, updatePlayers);
router.get('/games/game/vote/:id', checkAccessJWT, getUserVote);
router.post('/games/game/vote', checkAccessJWT, voteGame);
router.delete(
	'/games/game/:id',
	checkAccessJWT,
	checkRoles(roles.contentManager, roles.contentManager),
	checkOwnership,
	deleteGame
);
//router.post('/comment', comment);

module.exports = router;
