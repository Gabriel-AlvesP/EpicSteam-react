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
 * Axios with credentials, useful for private routes configuration
 */
const credAxios = axios.create({
	withCredentials: true,
});

export { pubAxios as axios, credAxios as axiosWCredentials };
