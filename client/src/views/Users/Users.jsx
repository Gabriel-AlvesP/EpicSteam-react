import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useInterceptors from '../../services/hooks/useInterceptors';

export default function Users() {
	const [users, setUsers] = useState([]);
	const [err, setErr] = useState('');
	const axiosInterceptor = useInterceptors();

	//TODO:
	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const handleUsers = async () => {
			try {
				const res = await axiosInterceptor.get(`/users`, {
					signal: controller.signal,
				});
				isMounted && setUsers(res.data);
			} catch (err) {
				if (err.response.status === 0) {
					setErr('No server response');
					return;
				}

				setErr(err?.response?.message || 'Error loading users');
			}
		};

		handleUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [axiosInterceptor]);

	return (
		<>
			<Container>
				{err.length > 0 ? (
					<h1>{err}</h1>
				) : (
					<ul>
						{users?.map((val, key) => {
							return <li key={key}>{val.Username}</li>;
						})}
					</ul>
				)}
				{/*<Button className="mt-5" onClick={handleUsers}>
					Update Users
					</Button>*/}
			</Container>
		</>
	);
}
