/**
 * Possible user roles
 */
const roles = {
	forumManager: 1899, //Can access backOffice (users & categories & comments management + website config)
	contentManager: 5204, //Can create and edit his own posts(games)
	visitor: 666, //Can comment & react to comments & Upvote/Downvote posts(games) & Set if he played the game
};

module.exports = roles;
