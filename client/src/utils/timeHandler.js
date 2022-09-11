/**
 * Gets how much time passed since the date
 * @param {string} date
 * @returns
 */
const timeSince = date => {
	let seconds = Math.floor((new Date() - new Date(date)) / 1000);

	let interval = seconds / 31557600;
	let floor = Math.floor(interval);
	if (interval > 1) {
		if (floor === 1) return Math.floor(interval) + ' year ago';
		return floor + ' years ago';
	}

	interval = seconds / 2629800;
	if (interval > 1) {
		floor = Math.floor(interval);
		if (floor === 1) return Math.floor(interval) + ' month ago';
		return Math.floor(interval) + ' months ago';
	}

	interval = seconds / 86400;
	if (interval > 1) {
		floor = Math.floor(interval);
		if (floor === 1) return Math.floor(interval) + ' day ago';
		return Math.floor(interval) + ' days ago';
	}

	interval = seconds / 3600;
	if (interval > 1) {
		floor = Math.floor(interval);
		if (floor === 1) return Math.floor(interval) + ' hour ago';
		return Math.floor(interval) + ' hours ago';
	}

	interval = seconds / 60;
	if (interval > 1) {
		floor = Math.floor(interval);
		if (floor === 1) return Math.floor(interval) + ' minute ago';
		return Math.floor(interval) + ' minutes ago';
	}

	return Math.floor(seconds) + ' seconds';
};

export { timeSince };
