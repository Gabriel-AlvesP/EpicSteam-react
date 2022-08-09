import React, { useState, useEffect, useRef } from 'react';
import './Auth.css';

/**
 * Handle sign up process
 * @returns
 */
export default function SignUp(props) {
	//Regular Expressions
	//const userName = RegEx.text

	const errRef = useRef();
	const userRef = useRef();

	//Username
	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(false);
	const [usernameFocus, setUsernameFocus] = useState(false);

	//User email
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	//Password
	const [passwd, setPasswd] = useState('');
	const [validPasswd, setValidPasswd] = useState(false);
	const [passwdFocus, setPasswdFocus] = useState(false);

	//Confirm password
	const [matchPasswd, setMatchPasswd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	//Messages
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

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

	//TODO: useEffect(() => userRef.current.focus(), []);

	/*
	 * Username validation
	 */
	useEffect(() => {
		/* Username
		 * Characters: Alphanumeric and SpecialCharacters: { _ .}
		 * Length: [3,20]
		 * Special Characters: can't be together or at the start
		 */
		const usernameValidator = RegExp(
			'^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^._].*$'
		);
		let regExResult = usernameValidator.test(username);

		setBtnDisable(regExResult);
		setValidUsername(regExResult);
	}, [username]);

	/*
	 * Email validation
	 */
	useEffect(() => {
		const emailValidator = RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$');

		setValidEmail(emailValidator.test(email));
	}, [email]);

	/*
	 * Password Validation
	 */
	useEffect(() => {
		const passwdValidator = RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,24}$');
		setValidPasswd(!passwdValidator.test(passwd));
		setValidMatch(passwd === matchPasswd);
	}, [passwd, matchPasswd]);

	/*
	 * Reset error message
	 */
	useEffect(() => {
		setErrMsg('');
	}, [username, email, passwd, matchPasswd]);

	/*
	 * Disable submit button
	 */
	useEffect(() => {
		const color = btnDisable ? '#A8B1D6' : '#ff7800';
		setBtnStyle(prevBtnStyle => ({ ...prevBtnStyle, background: color }));
	}, [btnDisable]);

	return (
		<>
			{errMsg}
			<div className="loginGroup">
				<input type="text" required></input>
				<label>Username</label>
			</div>

			<div className="loginGroup">
				<input type="text" required></input>
				<label>Email</label>
			</div>

			<div className="loginGroup">
				<input required type="password"></input>
				<label>Password</label>
			</div>
			<div className="loginGroup">
				<input type="password" required></input>
				<label>Confirm Password</label>
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
