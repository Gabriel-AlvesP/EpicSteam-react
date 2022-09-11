/**
 * Handles images requests
 * @param {Object} req request
 * @param {Object} res response
 */
const getImage = (req, res) => {
	const { image } = req.params;
	res.download(`uploads/images/${image}`);
};

module.exports = { getImage };
