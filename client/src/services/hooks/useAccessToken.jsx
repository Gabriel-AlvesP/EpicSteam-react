import { useAuth } from './useAuth';
import jwt_decode from 'jwt-decode';

/**
 * Verifies current user roles
 * @param {string} ownership username
 * @returns {function} verifies if the user has the necessary roles
 */
const useAccessToken = ownership => {
	const { auth } = useAuth();
	//Decode access token
	const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
	//Roles from the token
	const roles = decoded?.user?.roles || [];
	const freePass = roles.includes(1899);
	const isOwner = !ownership ? true : auth?.username === ownership;

	return (allowedRoles, owner) => {
		const checkOwner = !owner ? true : auth?.username === owner;

		return (
			freePass ||
			(auth?.username &&
				roles.find(role => allowedRoles?.includes(role)) &&
				isOwner &&
				checkOwner)
		);
	};
};

export { useAccessToken };
