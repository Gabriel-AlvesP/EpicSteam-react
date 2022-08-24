const { connection } = require('../../database/dbConfig');
const { serverErr } = require('../models/errorMessages');

function categories(req, res) {
	const query = `select * from categories;`;
	connection.query(query, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.json({ categories: dbRes });
	});
}

function newCategory(req, res) {
	const query = `INSERT INTO categories SET ?`;
	//TODO: Check data
	connection.query(query, req.body, (err, dbRes) => {
		if (err) return res.status(500).json({ message: serverErr });

		return res.sendStatus(201);
	});
}

module.exports = { categories, newCategory };
