/**
 * Axios Api
 *
 */
import Axios from 'axios';
import SERVER_URL from '../../utils/urls.js';

export const getUsers = async () => {
	let serverRes = await Axios.get(`${SERVER_URL}/users`);
	return serverRes.data;
};

//export default getUsers;
