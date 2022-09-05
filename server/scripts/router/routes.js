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
router.get('/games/game/:id', getGame);
router.get('/games/mostPlayed', mostPlayed);
router.get('/games/mostLiked', mostLiked);
router.get('/games/recentlyAdded', recentlyAdded);
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
	upload.single('image'),
	addGame
);
router.post(
	'/categories/new',
	checkAccessJWT,
	checkRoles(roles.forumManager, roles.contentManager),
	newCategory
);
//router.post('/comment', comment);

module.exports = router;
