/**
 * Axios Api
 *
 */
import Axios from 'axios';
import serverUrl from '../utils/urls.js';

const getUsers = async () => {
	let serverRes = await Axios.get(`${serverUrl}/users`);
	return serverRes.data;
};

export default getUsers;
