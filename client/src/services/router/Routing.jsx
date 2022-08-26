import { Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Home from '../../views/Home';
import Browse from '../../views/Browse';
import Game from '../../views/Game';
import Users from '../../views/Users/Users';
import Profile from '../../views/Users/Profile';
import NotFound from '../../views/Errors/NotFound';
import App from '../../App';
import PersistSignIn from './PersistSignIn';

/**
 * Application routing handling
 * @returns Routes
 */
const Routing = () => {
	return (
		<Routes>
			<Route element={<PersistSignIn />}>
				<Route path="/" element={<App />}>
					{/* Public routes */}
					<Route index element={<Home />} />
					<Route path="/browse" element={<Browse />} />
					<Route path="/game/:id" element={<Game />} />

					{/* Protected routes */}
					<Route element={<RequireAuth allowedRoles={[1899]} />}>
						<Route path="/users">
							{/* add element to be rendered into children */}
							<Route index element={<Users />} />
							<Route path=":id" element={<Profile />}></Route>
						</Route>
					</Route>
					<Route element={<RequireAuth allowedRoles={[2008, 1899]} />}>
						<Route path="/categories" />
					</Route>
				</Route>
				{/* Catch 404 errors */}
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default Routing;
