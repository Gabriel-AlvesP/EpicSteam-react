/**
 * Get most accurate message to some error
 *
 * @param {Object} err Catch error
 * @param {string} customMessage custom message to show in case server doesn't handle it
 * @returns {String} Message to be shown
 */
const handleError = (err, customMessage) => {
	if (err.response?.status === 0) return 'No server response';

	return (
		err.response?.data?.message ||
		customMessage ||
		'Server error. Try again later.'
	);
};

export default handleError;
