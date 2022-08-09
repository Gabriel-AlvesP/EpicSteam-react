import React, { useState, useEffect, useRef } from 'react';
import './Auth.css';
import ErrorMsg from './ErrorMsg';
import {
	usernameValidator,
	emailValidator,
	passwdValidator,
} from '../../utils/authRegExp';
/**
 * Handle sign up process
 * @returns
 */
export default function SignUp(props) {
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

	//Submit button
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

	//TODO: useEffect(() => userRef.current.focus(), []);

	/*
	 * Username validation
	 */
	useEffect(() => {
		setValidUsername(usernameValidator.test(username));
	}, [username]);

	/*
	 * Email validation
	 */
	useEffect(() => {
		setValidEmail(emailValidator.test(email));
	}, [email]);

	/*
	 * Password Validation
	 */
	useEffect(() => {
		setValidPasswd(passwdValidator.test(passwd));
		setValidMatch(passwd === matchPasswd && passwd.length > 0);
	}, [passwd, matchPasswd]);

	/*
	 * Reset error message when user is writing
	 */
	useEffect(() => {
		setErrMsg('');
	}, [username, email, passwd, matchPasswd]);

	/*
	 * Enable/Disable submit button
	 */
	useEffect(() => {
		if (validUsername && validEmail && validPasswd && validMatch)
			setBtnEnable(true);
		else setBtnEnable(false);
	}, [validUsername, validEmail, validPasswd, validMatch]);

	/*
	 * Change submit button color
	 */
	useEffect(() => {
		const color = btnEnable ? '#ff7800' : '#999999';
		setBtnStyle(prevBtnStyle => ({ ...prevBtnStyle, background: color }));
	}, [btnEnable]);

	//TODO: Pass the error message to the component
	return (
		<>
			<ErrorMsg errorMsg={''} />
			<div className="loginGroup">
				<input
					type="text"
					onChange={e => setUsername(e.target.value)}
					onFocus={() => setUsernameFocus(true)}
					onBlur={() => setUsernameFocus(false)}
					required
				></input>
				<label>Username</label>
			</div>
			<div className="loginGroup">
				<input
					type="text"
					onChange={e => setEmail(e.target.value)}
					onFocus={() => setEmailFocus(true)}
					onBlur={() => setEmailFocus(false)}
					required
				></input>

				<label>Email</label>
			</div>
			<div className="loginGroup">
				<input
					type="password"
					onChange={e => setPasswd(e.target.value)}
					onFocus={() => setPasswdFocus(true)}
					onBlur={() => setPasswdFocus(false)}
					required
				></input>

				<label>Password</label>
			</div>
			<div className="loginGroup">
				<input
					type="password"
					onChange={e => setMatchPasswd(e.target.value)}
					onFocus={() => setMatchFocus(true)}
					onBlur={() => setMatchFocus(false)}
					required
				></input>
				<label>Confirm Password</label>
			</div>
			<div>
				<button
					type="button"
					style={btnStyle}
					onClick={() => {
						console.log('enable');
						//TODO: write a handleSignUp on AxiosApi.js and import it
					}}
					/* 							
							onMouseEnter={() => setButtonHover(true)}
							onMouseLeave={() => setButtonHover(false)} */
					disabled={!btnEnable}
				>
					Sign up <span>{btnEnable}</span>
				</button>
				<div
					className="modal-nav"
					/* TODO: onClick={this.navigateSignup}*/
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
