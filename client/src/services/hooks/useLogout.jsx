import { privAxios } from '../api/axios';
import { useAuth, usePersist } from './useAuth';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';

/**
 * Clear user authentication state and
 * it requests the removal of user refresh token
 * @returns
 */
const useLogout = () => {
	const { setAuth } = useAuth();
	const { setAuthPersist } = usePersist();

	return async () => {
		//remove authState {username, accessToken}
		setAuth({});
		setAuthPersist(false);

		//Remove refresh token
		try {
			await privAxios.get('/logout');
		} catch (err) {
			toast.error(handleError(err, 'Logout failed. Please try again later.'));
		}
	};
};

export { useLogout };
