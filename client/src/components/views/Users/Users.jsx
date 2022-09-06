import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import useAccessAxios from '../../../services/hooks/useAccessAxios';

export default function Users() {
	const [users, setUsers] = useState([]);
	const [err, setErr] = useState('');
	const accessAxios = useAccessAxios();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const handleUsers = async () => {
			try {
				const res = await accessAxios.get(`/users`, {
					signal: controller.signal,
				});
				isMounted && setUsers(res.data);
			} catch (err) {
				if (err?.response?.status === 0) {
					setErr('No server response');
					return;
				}

				if (err?.message !== 'canceled')
					setErr(err?.response?.message || 'Error loading users');
			}
		};

		handleUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [accessAxios]);

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
			</Container>
		</>
	);
}
