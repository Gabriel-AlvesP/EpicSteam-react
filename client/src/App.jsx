import Routing from './routes/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function App() {
	//TODO: Remove links
	return (
		<div className="App">
			<div>
				<Link to="/">Home</Link>
				<br />
				<Link to="/Browse">Browse</Link>
				<br />
				<Link to="/Users">Users</Link>
			</div>
			<Routing />
		</div>
	);
}

export default App;
