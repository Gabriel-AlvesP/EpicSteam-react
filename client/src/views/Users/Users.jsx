import React, { useState } from 'react';
import getUsers from '../../services/api/AxiosAPI';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function Users() {
	const [users, setUsers] = useState([]);

	const handleUsers = async () => setUsers(await getUsers());

	useEffect(() => {
		handleUsers();
	}, []);

	return (
		<>
			<Container>
				<Button className="mt-5" onClick={handleUsers}>
					Update Users
				</Button>
				<ul>
					{users?.map((val, key) => {
						return <li key={key}>{val.Username}</li>;
					})}
				</ul>
			</Container>
		</>
	);
}
