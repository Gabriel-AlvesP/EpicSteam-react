import axios from 'axios';

//* <--  Axios Default config -->
axios.defaults.baseURL = 'http://localhost:3031';
axios.defaults.headers = { 'Content-Type': 'application/json' };

//* <-- Axios Instance Config -->

/**
 * Axios public routes configuration
 */
const accio = axios.create();

/**
 * Axios private routes configuration
 */
const privAxios = axios.create({
	withCredentials: true,
});

/**
 * Get all registered users
 * @returns [response] : [Error message]
 */
//TODO: Remove/Edit
const getUsers = async () => {};

/**
 * Create a new user request
 * @param {Object} data User object
 */
const signUp = async data => {
	try {
		let res = await accio.post('/signup', data);

		return res.data;
	} catch (err) {
		if (err.response.status === 0) return 'No server response';
		return err?.message;
	}
};

/**
 * Authenticate as an existing user
 * @param {Object} data User object
 */
const signIn = async data => {
	try {
		const res = await accio.post('/login', data, { withCredentials: true });

		return res.data;
	} catch (err) {
		if (err.response.status === 0) return 'No server response';
		return err.response?.data?.message || 'Sign in failed';
	}
};

const refreshToken = async () => {
	try {
		const response = await accio.get('/refresh', { withCredentials: true });
		return response.data;
	} catch (err) {
		return err.response?.data?.message || 'Refresh error';
	}
};

export {
	getUsers,
	signIn as signInReq,
	signUp as signUpReq,
	refreshToken,
	privAxios,
};
