import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../views/Home';
import Browse from '../views/Browse';
import Game from '../views/Game';
import Users from '../views/Users/Users';
import Profile from '../views/Users/Profile';
import NotFound from '../views/NotFound';

export default function Routing() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home />} />
			<Route path="/browse" element={<Browse />} />
			<Route path="/game/:id" element={<Game />} />
			<Route path="/users">
				{/* add element to be rendered into children */}
				<Route index element={<Users />} />
				<Route path=":id" element={<Profile />}></Route>
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
