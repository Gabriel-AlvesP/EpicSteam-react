import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import jwt_decode from 'jwt-decode';

/**
 * Access permission check
 * @param {Object} allowedRoles roles that are allowed in a location
 * @returns
 */
const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();

	const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;

	const roles = decoded?.user?.roles || [];

	return auth?.username && roles.find(role => allowedRoles?.includes(role)) ? (
		<Outlet />
	) : (
		/* Redirect user to Not found and replace it in history with the base user came from  */
		<Navigate to="/notfound" state={{ from: location }} replace />
	);
};

export default RequireAuth;
