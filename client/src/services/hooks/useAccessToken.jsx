import { useAuth } from './useAuth';
import jwt_decode from 'jwt-decode';

const useAccessToken = () => {
	const { auth } = useAuth();
	const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
	const roles = decoded?.user?.roles || [];

	return allowedRoles =>
		auth?.username && roles.find(role => allowedRoles?.includes(role));
};

export { useAccessToken };
