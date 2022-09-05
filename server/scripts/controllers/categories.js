const { connection } = require('../../database/dbConfig');
const { serverErr } = require('../models/errorMessages');

//TODO: Documentation

/**
 * Get all categories
 *
 * @param {Object} req request
 * @param {Object} res response
 */
function categories(req, res) {
	const query = `select * from categories;`;
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

	const query = `SELECT * from categories WHERE id = ${id}`;

	connection.query(query, (err, categoryRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		if (categoryRes.length <= 0) return res.sendStatus(404);

		const category = categoryRes[0];
		const gamesQuery = `select p.* from posts p join posts_categories pc on pc.postId=p.id where pc.categoryId = ${category.id};`;

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
	const query = `INSERT INTO categories SET ?`;
	//TODO: Check req data
	connection.query(query, req.body, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.sendStatus(201);
	});
}

module.exports = { categories, getCategory, newCategory };
