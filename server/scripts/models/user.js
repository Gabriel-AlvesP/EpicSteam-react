'use strict';

const roles = require('./roles');

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
function User(id, username, email, passwd, role = roles.visitor) {
	this.id = id || null;
	this.username = username;
	this.email = email;
	this.passwd = passwd;
	this.role = role;
	this.joinDate = new Date().toISOString().slice(0, 19).replace('T', ' '); //Date and time
}
