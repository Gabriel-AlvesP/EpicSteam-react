import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/context/AuthContext';
import './Auth.css';
import ErrorMsg from './ErrorMsg';
import SubmitBtn from './SubmitBtn';
import setInputColor, {
	usernameValidator,
	emailValidator,
	passwdValidator,
} from '../../utils/authValidations';

/**
 * Handle sign up process
 * @returns
 */
export default function SignUp(props) {
	const [focus, setFocus] = useState(0);
	const [, setAuth] = useAuth();

	//Username
	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(false);
	const [usernameColor, setUsernameColor] = useState('');

	//User email
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailColor, setEmailColor] = useState('');

	//Password
	const [passwd, setPasswd] = useState('');
	const [validPasswd, setValidPasswd] = useState(false);
	const [passwdColor, setPasswdColor] = useState('');

	//Confirm password
	const [matchPasswd, setMatchPasswd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchColor, setMatchColor] = useState('');

	//Submit button
	const [btnEnable, setBtnEnable] = useState(false);

	//TODO: on signUp success?
	//const [success, setSuccess] = useState(false);

	/*
	 * Auto focus on username when modal opens
	 */
	//const usernameRef = useRef();
	//useEffect(() => usernameRef.current.focus(), []);

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
		setValidEmail(emailValidator(email));
	}, [email]);

	/*
	 * Password Validation
	 */
	useEffect(() => {
		setValidPasswd(passwdValidator.test(passwd));
		setValidMatch(passwd === matchPasswd && passwd.length > 0);
	}, [passwd, matchPasswd]);

	/*
	 * Set Input colors with validation support
	 */
	useEffect(() => {
		setInputColor(username, validUsername, setUsernameColor);
	}, [username, validUsername]);

	useEffect(() => {
		setInputColor(email, validEmail, setEmailColor);
	}, [email, validEmail]);

	useEffect(() => {
		setInputColor(email, validEmail, setEmailColor);
	}, [email, validEmail]);

	useEffect(() => {
		setInputColor(passwd, validPasswd, setPasswdColor);
	}, [passwd, validPasswd]);

	useEffect(() => {
		setInputColor(matchPasswd, validMatch, setMatchColor);
	}, [matchPasswd, validMatch]);

	/*
	 * Enable/Disable submit button on validations change
	 */
	useEffect(() => {
		if (validUsername && validEmail && validPasswd && validMatch)
			setBtnEnable(true);
		else setBtnEnable(false);
	}, [validUsername, validEmail, validPasswd, validMatch]);

	/**
	 * Handle sign up request
	 * @param {Object} e event
	 */
	const signUp = e => {
		e.preventDefault();

		//TODO: check if everything is valid
		//!clg
		console.log('In development');
		//TODO: write a handleSignUp on AxiosApi.js and import it

		setAuth({ username, email });
	};

	return (
		<>
			<ErrorMsg
				focus={focus}
				validations={[validUsername, validEmail, validPasswd, validMatch]}
			/>
			<form onSubmit={signUp}>
				<div className="loginGroup">
					<input
						/*ref={usernameRef}*/
						id="signUpUsername"
						type="text"
						className={usernameColor}
						onChange={e => setUsername(e.target.value)}
						value={username}
						onFocus={() => setFocus(1)}
						onBlur={() => setFocus(0)}
						required
					></input>
					<label htmlFor="signUpUsername">Username</label>
				</div>
				<div className="loginGroup">
					<input
						id="signUpEmail"
						type="text"
						className={emailColor}
						onChange={e => setEmail(e.target.value)}
						value={email}
						onFocus={() => setFocus(2)}
						onBlur={() => setFocus(0)}
						required
					></input>

					<label htmlFor="signUpEmail">Email</label>
				</div>
				<div className="loginGroup">
					<input
						id="signUpPasswd"
						type="password"
						className={passwdColor}
						onChange={e => setPasswd(e.target.value)}
						value={passwd}
						onFocus={() => setFocus(3)}
						onBlur={() => setFocus(0)}
						required
					></input>

					<label htmlFor="signUpPasswd">Password</label>
				</div>
				<div className="loginGroup">
					<input
						id="signUpMatch"
						type="password"
						className={matchColor}
						onChange={e => setMatchPasswd(e.target.value)}
						value={matchPasswd}
						onFocus={() => setFocus(4)}
						onBlur={() => setFocus(0)}
						required
					></input>
					<label htmlFor="signUpMatch">Confirm Password</label>
				</div>
				<div>
					<SubmitBtn btnEnable={btnEnable} />
					<div className="modal-nav">
						Already have an account?{' '}
						<b onClick={props.onNavClick} className="modal-nav-link">
							Sign in
						</b>
					</div>
				</div>
			</form>
		</>
	);
}
