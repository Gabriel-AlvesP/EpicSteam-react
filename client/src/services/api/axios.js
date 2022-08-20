import axios from 'axios';

//* <--  Axios Default config -->
axios.defaults.baseURL = 'http://localhost:3031';
axios.defaults.headers = { 'Content-Type': 'application/json' };

//* <-- Axios Instance Config -->

/**
 * Axios public routes configuration
 */
const pubAxios = axios.create();
/**
 * Axios private routes configuration
 */
const privAxios = axios.create({
	withCredentials: true,
});

const refreshToken = async () => {
	try {
		const response = await pubAxios.get('/refresh', { withCredentials: true });
		return response.data;
	} catch (err) {
		return err.response?.data?.message || 'Refresh failed';
	}
};

export { pubAxios, privAxios, refreshToken };
