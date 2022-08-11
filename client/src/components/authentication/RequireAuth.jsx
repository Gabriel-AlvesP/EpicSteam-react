import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../services/context/AuthContext';

const RequireAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();

	return auth?.user ? (
		<Outlet />
	) : (
		/* Redirect user to Not found and replace it in history with the base user came from  */
		<Navigate to="/notfound" state={{ from: location }} replace />
	);
};

export default RequireAuth;
