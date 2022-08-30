import { useState, useEffect } from 'react';
import { useRefreshToken } from '../hooks/useRefreshToken';
import { useAuth, usePersist } from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

/**
 * Keep user authenticated if persistence was selected on sign in step
 * If user refresh token is still valid, this updates the access token,
 * in case it isn't valid anymore
 *
 * @returns
 */
const PersistSignIn = () => {
	const { auth } = useAuth();
	const { authPersist } = usePersist();
	const refresh = useRefreshToken();
	const [refreshIt, setRefreshIt] = useState(false);
	const [load, setLoad] = useState(true);

	useEffect(() => {
		authPersist && !auth?.accessToken ? setRefreshIt(true) : setLoad(false);
	}, [auth, authPersist]);

	useEffect(() => {
		let isMount = true;

		/*
		 * Try to refresh access token, keeping user authenticated
		 */
		const checkRefreshToken = async () => {
			//Refresh/Update authentication
			await refresh();
			setRefreshIt(false);
			isMount && setLoad(false);
		};

		//Calls checkRefreshToken in case persistence is activated and access token is not valid
		if (refreshIt) checkRefreshToken();

		//Unmount/clean function
		return () => {
			isMount = false;
		};
	}, [refresh, refreshIt]);

	return authPersist ? (
		load ? (
			<Spinner
				style={{ position: 'absolute', right: '50%', top: '40%' }}
				animation="border"
				variant="light"
				role="status"
			>
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		) : (
			<Outlet />
		)
	) : (
		<Outlet />
	);
};

export default PersistSignIn;
