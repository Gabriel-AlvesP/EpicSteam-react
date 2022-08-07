import Routing from './routes/Routing';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
//TODO: Remove
//import { Link } from 'react-router-dom';
function App() {
	return (
		<div className="App">
			<Navbar></Navbar>
			{
				//TODO: Remove
				/*	<div>
				<Link to="/">Home</Link>
				<br />
				<Link to="/browse">Browse</Link>
				<br />
				<Link to="/users">Users</Link>
			</div> */
			}
			<Routing />
		</div>
	);
}

export default App;
