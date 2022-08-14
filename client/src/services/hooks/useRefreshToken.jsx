import axios from 'axios';
import { useAuth } from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	/**
	 *
	 */
	const refresh = async () => {
		//TODO: Axios call to refresh endpoint
		//TODO: Remove axios.get
		const response = await axios.get('/refresh', {
			withCredentials: true,
		});

		setAuth(prev => ({ ...prev, accessToken: response.data.accessToken }));
		return response.data.accessToken;
	};
	return refresh;
};

export default useRefreshToken;
