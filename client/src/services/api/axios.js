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

export { pubAxios, privAxios };
