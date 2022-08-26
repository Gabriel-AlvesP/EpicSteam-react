const handleError = (err, customMessage) => {
	if (err.response?.status === 0) return 'No server response';

	return (
		err.response?.data?.message ||
		customMessage ||
		'Server error. Try again later.'
	);
};

export default handleError;
