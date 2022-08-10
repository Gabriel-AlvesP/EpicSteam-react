import React, { useState, useEffect } from 'react';
import './Auth.css';
import ErrorMsg from './ErrorMsg';
import {
	usernameValidator,
	emailValidator,
	passwdValidator,
} from '../../utils/authValidations';

export default function SignIn(props) {
	const [userId, setUserId] = useState('');
	const [validId, setValidId] = useState(false);
	const [idType, setIdType] = useState(true); // True username : False email

	const [passwd, setPasswd] = useState('');
	const [validPasswd, setValidPasswd] = useState(false);

	const [errMessage, setErrMessage] = useState('');

	const [btnEnable, setBtnEnable] = useState(false);
	const [btnStyle, setBtnStyle] = useState({
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 48,
		width: 300,
		padding: '0 30px',
		fontSize: '18px',
		background: '#999999',
	});

	/*
	 * Check identifier type and validates it
	 */
	useEffect(() => {
		if (usernameValidator.test(userId)) {
			setIdType(true);
			setValidId(true);
			return;
		}

		if (emailValidator(userId)) {
			setIdType(false);
			setValidId(true);
			return;
		}

		setValidId(false);
	}, [userId]);

	/*
	 * Validate password
	 */
	useEffect(() => {
		if (passwdValidator.test(passwd)) setValidPasswd(true);
		else setValidPasswd(false);
	}, [passwd]);

	/*
	 * Enables the submit button
	 */
	useEffect(() => {
		if (userId && passwd) setBtnEnable(true);
		else setBtnEnable(false);
	}, [userId, passwd]);

	/*
	 * Disable submit button
	 */
	useEffect(() => {
		const color = btnEnable ? '#ff7800' : '#999999';
		setBtnStyle(prevBtnStyle => ({ ...prevBtnStyle, background: color }));
	}, [btnEnable]);

	/**
	 * Handle sign in request
	 * @param {Object} e event
	 */
	const signIn = e => {
		e.preventDefault();

		if (!validId) {
			setErrMessage(`This user doesn't exist`);
			return;
		}

		if (!validPasswd) {
			setErrMessage(`Invalid password`);
			return;
		}

		//!clg
		console.log('success');
		setErrMessage('');

		if (idType) {
			//username
			//TODO: usernames query/handling
		}

		//email
		//TODO: emails query/handling
	};

	return (
		<>
			<ErrorMsg message={errMessage} />
			<form onSubmit={signIn}>
				<div className="loginGroup">
					<input
						type="text"
						onChange={e => setUserId(e.target.value)}
						required
					></input>
					<label>Username or Email</label>
				</div>

				<div className="loginGroup">
					<input
						onChange={e => setPasswd(e.target.value)}
						type="password"
						required
					></input>
					<label>Password</label>
				</div>

				<div>
					<button
						type="submit"
						style={btnStyle}
						onClick={signIn}
						disabled={!btnEnable}
					>
						Sign in
					</button>
					<div className="modal-nav">
						Already have an account?{' '}
						<b onClick={props.onNavClick} className="modal-nav-link">
							Sign up
						</b>
					</div>
				</div>
			</form>
		</>
	);
}
