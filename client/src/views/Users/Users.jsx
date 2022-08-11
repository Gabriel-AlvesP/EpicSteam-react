import { useState } from 'react';
import { getUsers } from '../../services/api/axios';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function Users() {
	const [users, setUsers] = useState([]);
	const [err, setErr] = useState('');

	const handleUsers = async () => {
		let response = await getUsers();
		if (typeof response === 'string') {
			setErr(response);
		} else setUsers(response);
	};

	useEffect(() => {
		handleUsers();
	}, []);

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
				<Button className="mt-5" onClick={handleUsers}>
					Update Users
				</Button>
			</Container>
		</>
	);
}
