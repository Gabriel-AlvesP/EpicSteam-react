import React, { useState, useEffect, useRef } from 'react';

/**
 *
 * @returns
 */
export default function SignUp() {
	//Regular Expressions
	//const userName = RegEx.text

	const errRef = useRef();
	const userRef = useRef();

	//Modal
	const [modalShow, setModalShow] = useState(false);

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

	//Use Effect (On mount)
	//useEffect(() => userRef.current.focus(), []);

	useEffect(() => {
		//TODO: RegEx - username

		let condition = false;
		setValidUsername(condition);
	}, [username]);

	useEffect(() => {
		const emailValidator = RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$');

		let condition = false;
		setValidEmail(condition);
	}, [email]);

	useEffect(() => {
		const regEx = RegExp('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,24}$');

		//TODO: RegEx - pwd
		let condition = false;
		setValidPasswd(condition);
		setValidMatch(passwd === matchPasswd);
	}, [passwd, matchPasswd]);

	useEffect(() => {
		setErrMsg('');
	}, [username, email, passwd, matchPasswd]);

	//TODO: Add Sign up modal
	return (
		/* 			<p
				ref={errRef}
				className={errMsg ? 'errMsg' : 'offScreen'}
				aria-live="assertive"
			>
				{errMsg}
			</p> */
		<>
			<div>signUp modal content</div>
			<div>signUp modal content</div>
			<div>signUp modal content</div>
			<div>signUp modal content</div>
			<div>signUp modal content</div>
			<div>signUp modal content</div>
			<div>signUp modal content</div>
		</>
	);
}
