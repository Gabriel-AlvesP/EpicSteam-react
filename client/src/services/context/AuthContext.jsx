import React, { useState } from 'react';

//* <-- Context -->

//Authentication Context
export const AuthContext = React.createContext();

//* <-- Custom Hooks -->

//See hooks folder

//* <-- Provider Class -->

/**
 * Authentication Provider Component
 *
 * Aggregates {@link AuthContext} context and provides it to children
 *
 * @param {Element} children - wrapped components
 * @returns {Element} Context Providers {@link AuthContext}
 */
export default function AuthProvider({ children }) {
	const [auth, setAuth] = useState({});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}
