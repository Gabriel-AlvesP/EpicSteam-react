import { Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import Home from '../../components/views/Home';
import Browse from '../../components/views/Browse';
import Game from '../../components/views/Game';
import Users from '../../components/views/Users/Users';
/* import Profile from '../../components/views/Users/Profile'; */
import NotFound from '../../components/views/Errors/NotFound';
import Category from '../../components/views/Category';
import App from '../../App';
import PersistSignIn from './PersistSignIn';

/**
 * Application routing handling
 * @returns Routes
 */
const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<App />}>
				<Route element={<PersistSignIn />}>
					{/* Public routes */}
					<Route index element={<Home />} />
					<Route path="/browse" element={<Browse />} />
					<Route path="/games/:gameId" element={<Game />} />
					<Route path="/categories/:id" element={<Category />} />

					{/* Protected routes */}
					<Route element={<RequireAuth allowedRoles={[1899]} />}>
						<Route path="/users">
							{/* add element to be rendered into children */}
							<Route index element={<Users />} />
							{/* <Route path=":id" element={<Profile />} /> */}
						</Route>
					</Route>
				</Route>
			</Route>
			{/* Catch 404 errors */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default Routing;
