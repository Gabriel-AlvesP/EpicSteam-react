import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Get the state of authentication
 *
 * It gets the user state defined in {@link AuthProvider} and set as value for {@link AuthContext} and provides it to get the authentication state inside components wrapped by the context
 *
 * @returns {function} useContext of AuthContext
 */
export function useAuth() {
	return useContext(AuthContext);
}
