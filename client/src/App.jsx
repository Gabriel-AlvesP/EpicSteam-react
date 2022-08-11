import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';
/**
 * Calls {@link Layout} component
 * and retrieves all components part the page to be shown,
 * according to the route {@link Routing}
 * @returns App Layout
 */
export default function App() {
	return (
		<div className="App">
			<Layout />
		</div>
	);
}
