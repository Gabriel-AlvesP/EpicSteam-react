import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
			{/*TODO 			<footer>Gabriel A. Pais - 201900301</footer> */}
			<ToastContainer
				position="top-right"
				autoClose={4500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}
