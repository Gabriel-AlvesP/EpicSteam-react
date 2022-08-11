import axios from 'axios';

/**
 * Axios config
 */
const accio = axios.create({
	baseURL: 'http://localhost:3031',
});

/**
 * Get all registered users
 * @returns [response] : [Error message]
 */
//TODO: Remove/Edit
const getUsers = async () => {
	try {
		let res = await accio.get(`/users`);
		return res.data;
	} catch (err) {
		if (err.response.status === 0) {
			return 'No server response';
		}

		//409 - Conflict
		if (err.response?.status === 409) {
			//TODO: Username/Email in use
			return;
		}

		return 'Request failed!';
	}
};

/**
 * Create a new user request
 * @param {Object} data User object
 */
const signUp = async data => {
	try {
		let res = await accio.post('/signup', data);
		//TODO: implement
		return res;
	} catch (err) {}
};

/**
 * Authenticate as an existing user
 * @param {Object} data User object
 */
const signIn = async data => {
	try {
		let res = await accio.post('/login', data);
		return res.data;
	} catch (err) {}
};

/* const handleError = status => {
	if (status === 0) {
		return 'No server response';
	}
}; */

export { getUsers, signIn, signUp };
