import { useLogout } from '../../services/hooks/useLogout';
import { useNavigate } from 'react-router-dom';

//TODO: Atualizar + documentar
const SignOut = () => {
	const navigate = useNavigate();
	const logout = useLogout();

	/**
	 * Clear authentication
	 * Redirect user to home page
	 */
	const handleSignOut = async () => {
		await logout();
		navigate('/', { replace: true });
	};

	return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
