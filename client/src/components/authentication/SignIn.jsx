import React, { useState, useEffect } from 'react';
import './Auth.css';

export default function SignIn(props) {
	const [userIdentifier, setUserIdentifier] = useState('');
	const [userValid, setUserValid] = useState(false);

	const [passwd, setPasswd] = useState('');
	const [passwdValid, setPasswdValid] = useState(false);

	const [errMsg, setErrMsg] = useState('');

	const [btnDisable, setBtnDisable] = useState(true);
	const [btnStyle, setBtnStyle] = useState({
		borderRadius: 3,
		border: 0,
		color: 'white',
		height: 48,
		width: 300,
		padding: '0 30px',
		fontSize: '18px',
		background: '#5264AE',
	});

	useEffect(() => {});

	/*
	 * Disable submit button
	 */
	useEffect(() => {
		const color = btnDisable ? '#999999' : '#ff7800';
		setBtnStyle(prevBtnStyle => ({ ...prevBtnStyle, background: color }));
	}, [btnDisable]);

	return (
		<>
			{errMsg}
			<div className="loginGroup">
				<input type="text" required></input>
				<label>Username or Email</label>
			</div>

			<div className="loginGroup">
				<input required type="password"></input>
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
					disabled={btnDisable}
				>
					Sign up
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
