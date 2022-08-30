import React, { useState, useEffect } from 'react';

//* <-- Context -->

//Authentication Context
export const AuthContext = React.createContext();
export const PersistContext = React.createContext();
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
	const [authPersist, setAuthPersist] = useState(
		JSON.parse(localStorage.getItem('persist')) || false
	);

	useEffect(() => {
		localStorage.setItem('persist', authPersist);
	}, [authPersist]);

	return (
		<PersistContext.Provider value={{ authPersist, setAuthPersist }}>
			<AuthContext.Provider value={{ auth, setAuth }}>
				{children}
			</AuthContext.Provider>
		</PersistContext.Provider>
	);
}
