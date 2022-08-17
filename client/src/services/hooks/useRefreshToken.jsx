import { useAuth } from './useAuth';
import { refreshToken } from '../api/axios';

/**
 * Hook that uses refresh token to get a new access token when it expires
 * @returns {Function} refresh function that provides a new access token
 */
const useRefreshToken = () => {
	const { setAuth } = useAuth();

	/**
	 * Refresh access token when it expires
	 */
	const refresh = async () => {
		const response = await refreshToken();
		setAuth(prev => {
			console.log(prev);
			console.log(response.data.accessToken);
			//overwrite the new access token
			return { ...prev, accessToken: response.data.accessToken };
		});

		//New refresh token
		return response.data.accessToken;
	};
	//Function
	return refresh;
};

export default useRefreshToken;
