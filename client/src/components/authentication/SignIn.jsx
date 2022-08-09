import React, { useState, useEffect } from 'react';
import './Auth.css';
import ErrorMsg from './ErrorMsg';

export default function SignIn(props) {
	const [userIdentifier, setUserIdentifier] = useState('');
	const [userValid, setUserValid] = useState(false);

	const [passwd, setPasswd] = useState('');
	const [passwdValid, setPasswdValid] = useState(false);

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

	useEffect(() => {});

	/*
	 * Disable submit button
	 */
	useEffect(() => {
		const color = btnEnable ? '#999999' : '#ff7800';
		setBtnStyle(prevBtnStyle => ({ ...prevBtnStyle, background: color }));
	}, [btnEnable]);

	//TODO: Mudar o errMsg para um componente separado e utiliza-lo para toda a autenticacao
	return (
		<>
			<ErrorMsg errorMsg={''} />
			<div className="loginGroup">
				<input type="text" onChange={} required></input>
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
					disabled={btnEnable}
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
