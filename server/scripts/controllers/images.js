/**
 * Handles images requests
 * @param {Object} req request
 * @param {Object} res response
 */
const getImage = (req, res) => {
	const { image } = req.params;
	res.download(`uploads/images/${image}`);
};

//TODO
const getBanner = (req, res) => {
	const { banner } = req.params;
	res.download(`uploads/images/banners/${banner}`);
};

const getCover = (req, res) => {
	const { cover } = req.params;
	res.download(`uploads/images/covers/${cover}`);
};

module.exports = { getImage };
