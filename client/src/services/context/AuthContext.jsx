import React, { useContext, useState } from 'react';

//TODO: Add authorization
//* <-- Contexts -->

//Authentication Context
const AuthContext = React.createContext();
//Set Authentication Context
const SetAuthContext = React.createContext();

//* <-- Custom Hooks -->

/**
 * Get the state of authentication
 *
 * It gets the user state defined in {@link AuthProvider} and set as value for {@link AuthContext} and provides it to get the authentication state inside components wrapped by the context
 *
 * @returns {function} useContext of SetAuthContext
 */
export function useAuth() {
	return useContext(AuthContext);
}

/**
 * Set the state of authentication
 *
 * Uses the function {@link updateUser}, that was set as value for {@link SetAuthContext}, to provide a set authentication state inside components wrapped by the context
 *
 * @returns {function} useContext of SetAuthContext
 */
export function useSetAuth() {
	return useContext(SetAuthContext);
}

//* <-- Provider Class -->

/**
 * Authentication Provider Component
 *
 * Aggregates {@link AuthContext} & {@link SetAuthContext} contexts and provides them to children
 *
 * @param {Components} children - wrapped components
 * @returns {Element} Context Providers {@link AuthContext} & {@link SetAuthContext}
 */
export function AuthProvider({ children }) {
	const [user, setUser] = useState({});

	/**
	 * Update user State
	 *
	 * It's used as value in {@link SetAuthContext} to offer the possibility of update the user state in wrapped components
	 *
	 * @param {Object} newUser - User
	 */
	function updateUser(newUser) {
		setUser(newUser);
	}

	return (
		<AuthContext.Provider value={user}>
			<SetAuthContext.Provider value={updateUser}>
				{children}
			</SetAuthContext.Provider>
		</AuthContext.Provider>
	);
}
