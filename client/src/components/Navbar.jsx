import React, { useState } from 'react';
import './Navbar.css';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';
import icon from '../assets/images/icon.png';

//TODO: Change when the user is authenticated
export default function Navbar() {
	const [modalShow, setModalShow] = useState(false);
	const [modalContent, setModalContent] = useState(<></>);

	const handleSignUp = () => {
		setModalContent(<SignUp />);
		setModalShow(true);
	};

	const handleSignIn = () => {
		setModalContent(<SignIn />);
		setModalShow(true);
	};

	const handleModalHide = () => {
		setModalShow(false);
		setModalContent(<></>);
	};

	return (
		<>
			<nav className="navbar navbar-container">
				<div>
					<Link to="/">
						<img className="navbar-logo" src={icon} alt="Logo" />
					</Link>
					<Link className="navbar-link " to="/">
						Home
					</Link>
					<Link className="navbar-link " to="/browse">
						Browse
					</Link>
				</div>

				<div className="navbar-auth">
					<div className="auth-btn" onClick={handleSignUp}>
						SignUp
					</div>
					<div className="divider"></div>
					<div className="auth-btn signIn-btn" onClick={handleSignIn}>
						SignIn
					</div>
				</div>
			</nav>
			<Modal show={modalShow} onHide={handleModalHide}>
				{modalContent}
			</Modal>
		</>
	);
}
