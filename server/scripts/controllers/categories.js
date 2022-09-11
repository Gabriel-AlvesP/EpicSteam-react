const { connection } = require('../../database/dbConfig');
const { serverErr } = require('../models/errorMessages');

/**
 * Get all categories
 *
 * @param {Object} req request
 * @param {Object} res response
 */
function categories(req, res) {
	const query = `select * from Categories;`;
	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.json({ categories: dbRes });
	});
}

/**
 * Get category and its games
 *
 * @param {Object} req request
 * @param {Object} res response
 */
function getCategory(req, res) {
	const { id } = req.params;

	if (!Number.isInteger(Number(id))) return res.sendStatus(404);

	const query = `SELECT * from Categories WHERE id = ${id}`;

	connection.query(query, (err, categoryRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		if (categoryRes.length !== 1) return res.sendStatus(404);

		const category = categoryRes[0];
		const gamesQuery = `select p.* from Posts p join Posts_Categories pc on pc.postId=p.id where pc.categoryId = ${category.id};`;

		connection.query(gamesQuery, (err, gamesRes) => {
			if (err) return res.status(500).json({ message: serverErr });

			res.json({ category: categoryRes[0], games: gamesRes });
		});
	});
}

/**
 * Insert a new category
 * @param {Object} req request
 * @param {Object} res response
 */
function newCategory(req, res) {
	const { name } = req.body;

	if (!req.file || !name) return res.sendStatus(400);

	const query = `INSERT INTO Categories SET ?`;

	connection.query(query, { name: name, icon: req.file.filename }, err => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.sendStatus(201);
	});
}

/**
 * Deletes a category
 * @param {object} req request
 * @param {object} res response
 * @returns
 */
function deleteCategory(req, res) {
	const { id } = req.params;

	if (!Number(id)) return res.sendStatus(400);

	const query = `DELETE FROM Categories where id=${id};`;
	connection.query(query, err => {
		if (err) return res.sendStatus(500);

		return res.sendStatus(202);
	});
}

module.exports = { categories, getCategory, newCategory, deleteCategory };
