import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../services/hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth();
	const location = useLocation();

	return auth?.user &&
		auth?.roles?.find(role => allowedRoles?.includes(role)) ? (
		<Outlet />
	) : (
		/* Redirect user to Not found and replace it in history with the base user came from  */
		<Navigate to="/notfound" state={{ from: location }} replace />
	);
};

export default RequireAuth;
