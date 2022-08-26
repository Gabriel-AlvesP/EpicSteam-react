import { useAuth } from './useAuth';
import { privAxios } from '../api/axios';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';

/**
 * Hook that uses refresh token to get a new access token when it expires
 * @returns {Function} refresh function that provides a new access token
 */
const useRefreshToken = () => {
	const { setAuth } = useAuth();

	/**
	 * Refresh access token when it expires
	 */
	return async () => {
		try {
			const response = await privAxios.get('/refresh');

			//Set new accessToken into authentication state
			setAuth(prev =>
				//Overwrite the old access token with the new one
				({
					...prev,
					username: response?.data?.username,
					accessToken: response?.data?.accessToken,
				})
			);

			//New refresh token
			return response?.data?.accessToken;
		} catch (err) {
			if (err?.response?.status === 403)
				toast.error(handleError(err, 'Authentication refresh failed.'));
		}
	};
};

export { useRefreshToken };
