import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

const serverUrl = `${window.location.protocol}//${window.location.hostname}:3030`;

function App() {
	const [users, setUsers] = useState([]);

	const getUsers = () => {
		let url = `${serverUrl}/users`;
		Axios.get(url).then(res => {
			setUsers(res.data);
			console.log(res.data);
		});
	};

	return (
		<div className="App">
			Hello World!
			<button onClick={getUsers}>Users</button>
			<ul>
				{users.map((val, key) => {
					return <li key={key}>{val.Username}</li>;
				})}
			</ul>
		</div>
	);
}

export default App;
