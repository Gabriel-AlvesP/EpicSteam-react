const { connection } = require('../../database/dbConfig');

/**
 *
 * @param {*} req request
 * @param {*} res response
 */
function users(req, res) {
	const query = `SELECT u.id, u.username, u.email, u.joinDate, ur.role from Users u right join User_Roles ur on u.id=ur.userId;`;
	connection.query(query, (err, dbRes) => {
		if (err) res.status(500).json({ message: 'Server internal error' });

		let response = [];
		dbRes.forEach((elem, idx, arr) => {
			arr.splice(idx, 1);

			let repeatedArr = arr.map(el => {
				if (el.username === elem.username) return el;
			});

			if (repeatedArr.length > 0) {
				let { role, ...cur } = elem;
				cur.roles = [role];
				repeatedArr.forEach(element => {
					if (element) {
						let { role } = element;
						cur.roles.push(role);
					}
				});
				response.push(cur);
			}
		});

		res.json(response);
	});
}

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

	if (req.uid === id) return res.sendStatus(400);

	const query = `DELETE FROM Users where id='${id}'`;
	connection.query(query, err => {
		if (err) throw err;
		if (err) return res.sendStatus(500);

		return res.sendStatus(202);
	});
}

module.exports = { users, updateUserRole, removeUser };
