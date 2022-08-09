import React, { useState, useEffect } from 'react';
import './Auth.css';
import ErrorMsg from './ErrorMsg';
import {
	usernameValidator,
	emailValidator,
	passwdValidator,
} from '../../utils/authRegExp';

export default function SignIn(props) {
	const [userIdentifier, setUserIdentifier] = useState('');
	const [validId, setValidId] = useState(false);
	const [idType, setIdType] = useState(true); // True username : False email

	const [passwd, setPasswd] = useState('');
	const [validPasswd, setValidPasswd] = useState(false);

	const [errMsg, setErrMsg] = useState('');

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

	useEffect(() => {
		if (usernameValidator.test(userIdentifier)) {
			setIdType(true);
			setValidId(true);
			return;
		}

		if (emailValidator.test(userIdentifier)) {
			setIdType(false);
			setValidId(true);
			return;
		}

		setValidId(false);
		setErrMsg('This user does not exist');
	}, [userIdentifier]);

	useEffect(() => {
		if (passwdValidator.test(passwd)) setValidPasswd(true);
		else {
			setValidPasswd(false);
			setErrMsg('Invalid password.');
		}
	}, [passwd]);

	useEffect(() => {
		if (validId && validPasswd) setBtnEnable(true);
		else setBtnEnable(false);
	}, [validId, validPasswd]);

	const signIn = () => {
		//TODO:
	};

	/*
	 * Disable submit button
	 */
	useEffect(() => {
		const color = btnEnable ? '#ff7800' : '#999999';
		setBtnStyle(prevBtnStyle => ({ ...prevBtnStyle, background: color }));
	}, [btnEnable]);

	//TODO: Mudar o errMsg para um componente separado e utiliza-lo para toda a autenticacao
	return (
		<>
			<ErrorMsg errorMsg={''} />
			<div className="loginGroup">
				<input
					type="text"
					onChange={e => setUserIdentifier(e.target.value)}
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
					type="button"
					style={btnStyle}
					/* 							
							onClick={handleSignUp} //TODO: write a handleSignUp on AxiosApi.js and import it
							onMouseEnter={() => setButtonHover(true)}
							onMouseLeave={() => setButtonHover(false)} */
					disabled={!btnEnable}
				>
					Sign in
				</button>
				<div
					className="modal-nav"
					/* TODO:
						onClick={this.navigateSignup}
						onMouseEnter={this.handleSignUpHoverEnter}
						onMouseLeave={this.handleSignUpHoverLeave} */
				>
					Already have an account?{' '}
					<b onClick={props.onNavClick} className="modal-nav-link">
						Sign in
					</b>
				</div>
			</div>
		</>
	);
}
