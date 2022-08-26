import { useContext } from 'react';
import { AuthContext, PersistContext } from '../context/AuthContext';

/**
 * Get the state of authentication
 *
 * It gets the user state defined in {@link AuthProvider}
 * sets it as value for {@link AuthContext} and
 * provides it to get the authentication state
 * inside components wrapped by the context
 *
 * @returns {function} useContext of AuthContext
 */
function useAuth() {
	return useContext(AuthContext);
}

/**
 * Get the state of persist
 *
 * It gets the user state defined in {@link AuthProvider}
 * sets it as value for {@link PersistContext} and
 * provides it to get the authentication persistence state
 * inside components wrapped by the context
 *
 * @returns {function} useContext of PersistContext
 */
function usePersist() {
	return useContext(PersistContext);
}

export { useAuth, usePersist };
