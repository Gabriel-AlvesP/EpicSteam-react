import React, { useState, useEffect } from 'react';
import './Auth.css';
import ErrorMsg from './ErrorMsg';
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

	/*
	 * Change submit button color on button enabling/disabling
	 */
	useEffect(() => {
		const color = btnEnable ? '#ff7800' : '#999999';
		setBtnStyle(prevBtnStyle => ({ ...prevBtnStyle, background: color }));
	}, [btnEnable]);

	/**
	 * Handle sign up request
	 * @param {Object} e event
	 */
	const signUp = e => {
		e.preventDefault();
		//!clg
		console.log('In development');
		//TODO: write a handleSignUp on AxiosApi.js and import it
	};

	//TODO: Pass the error message to the component
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
						type="text"
						className={usernameColor}
						onChange={e => setUsername(e.target.value)}
						onFocus={() => setFocus(1)}
						onBlur={() => setFocus(0)}
						required
					></input>
					<label>Username</label>
				</div>
				<div className="loginGroup">
					<input
						type="text"
						className={emailColor}
						onChange={e => setEmail(e.target.value)}
						onFocus={() => setFocus(2)}
						onBlur={() => setFocus(0)}
						required
					></input>

					<label>Email</label>
				</div>
				<div className="loginGroup">
					<input
						type="password"
						className={passwdColor}
						onChange={e => setPasswd(e.target.value)}
						onFocus={() => setFocus(3)}
						onBlur={() => setFocus(0)}
						required
					></input>

					<label>Password</label>
				</div>
				<div className="loginGroup">
					<input
						type="password"
						onChange={e => setMatchPasswd(e.target.value)}
						className={matchColor}
						onFocus={() => setFocus(4)}
						onBlur={() => setFocus(0)}
						required
					></input>
					<label>Confirm Password</label>
				</div>
				<div>
					<button type="submit" style={btnStyle} disabled={!btnEnable}>
						Sign up <span>{btnEnable}</span>
					</button>
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
