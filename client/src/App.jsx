import './App.css';
import Axios from 'axios';

function App() {
	const getUsers = () => {
		let host = `${window.location.protocol}//${window.location.host}`;
		Axios.get(host);
	};

	return (
		<div className="App">
			Hello World!
			<button onClick={getUsers}>Users</button>
		</div>
	);
}

export default App;
