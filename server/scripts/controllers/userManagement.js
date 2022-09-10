const { connection } = require('../../database/dbConfig');

function updateUserRole(req, res) {
	const { userId, role } = req.body;
	const { uid } = req;

	if (uid === userId) return res.sendStatus(400);

	const query = `INSERT INTO User_Roles (role, userId) VALUES(${role}, ${userId}) ON DUPLICATE KEY UPDATE role=${role}`;
	connection.query(query, err => {
		if (err) return res.sendStatus(500);

		return res.sendStatus(201);
	});
}

function removeUser(req, res) {
	const { id } = req.params;

	if (uid === id) return res.sendStatus(400);

	const query = `DELETE FROM Users where id=${id}`;
	connection.query(query, err => {
		if (err) return res.sendStatus(500);

		return res.sendStatus(202);
	});
}

module.exports = { updateUserRole, removeUser };
