import Routing from './services/router/Routing';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
//TODO: Remove
//import { Link } from 'react-router-dom';
function App() {
	return (
		<div className="App">
			<Header></Header>
			<Routing />
		</div>
	);
}

export default App;
