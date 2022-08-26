import { useState, useEffect } from 'react';
import { useRefreshToken } from '../hooks/useRefreshToken';
import { useAuth, usePersist } from '../hooks/useAuth';
import { Outlet } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import handleError from '../../utils/errorHandling';
import { toast } from 'react-toastify';

//TODO Documentation
/**
 *
 * @returns
 */
const PersistSignIn = () => {
	const [load, setLoad] = useState(true);
	const refresh = useRefreshToken();
	const { auth } = useAuth();
	const { authPersist } = usePersist();

	useEffect(() => {
		let isMount = true;

		/*
		 *
		 */
		const checkRefreshToken = async () => {
			try {
				//Refresh/Update authentication
				await refresh();
			} catch (err) {
				if (err?.response?.status === 403)
					toast.error(handleError(err, 'Failed to authenticate.'));
			} finally {
				isMount && setLoad(false);
			}
		};

		!authPersist || auth?.accessToken ? setLoad(false) : checkRefreshToken();

		return () => (isMount = false);
	}, [refresh, auth, authPersist]);

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
