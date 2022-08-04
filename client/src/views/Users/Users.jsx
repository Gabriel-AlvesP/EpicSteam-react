import React, { useState } from 'react';
import getUsers from '../../services/axiosAPI';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';

export default function Users() {
	const [users, setUsers] = useState([]);

	const handleUsers = async () => setUsers(await getUsers());

	useEffect(() => {
		handleUsers();
	}, []);

	return (
		<>
			<Container>
				<button className="justify-content-center" onClick={handleUsers}>
					Update Users {typeof users}
				</button>
				<ul>
					{users?.map((val, key) => {
						return <li key={key}>{val.Username}</li>;
					})}
				</ul>
			</Container>
		</>
	);
}
