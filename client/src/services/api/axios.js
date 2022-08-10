import axios from 'axios';

const accio = axios.create({
	baseURL: 'http://localhost:3031',
});

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

export { getUsers };
