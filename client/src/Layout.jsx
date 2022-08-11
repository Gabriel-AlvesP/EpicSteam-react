import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

/**
 *  Mounts the application default layout
 * @returns Layout
 */
export default function Layout() {
	return (
		<>
			<Header></Header>
			<main>
				<Container className="fakeFluid" fluid>
					<Outlet />
				</Container>
			</main>
			<footer>Gabriel A. Pais - 201900301</footer>
		</>
	);
}
