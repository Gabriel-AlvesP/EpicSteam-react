import { useAuth } from './useAuth';
import jwt_decode from 'jwt-decode';

const useAccessToken = ownership => {
	const { auth } = useAuth();
	const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
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
