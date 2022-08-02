'use strict';

/**
 * Possible user roles
 */
const roles = {
	forumManager: 0,
	contentManager: 1,
	visitor: 2,
};

/**
 * User Model class
 *
 * @class User
 *
 * @param @property {String} username - user nickname
 * @param @property {String} email - user email
 * @param @property {String} passwd - user password
 * @param @property {Number} role - user role
 * @property {Date} joinDate - timestamp on user creation
 */
function User(username, email, passwd, role = roles.visitor) {
	this.username = username;
	this.email = email;
	this.passwd = passwd;
	this.role = role;
	this.joinDate = new Date().toLocaleDateString();
}
