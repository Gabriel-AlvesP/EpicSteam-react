import axios from 'axios';
import serverUrl from '../../utils/urls';

const getUsers = async () => {
	try {
		let res = await axios.get(`${serverUrl}/users`);
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

		return 'Registration failed!';
	}
};

export { getUsers };
