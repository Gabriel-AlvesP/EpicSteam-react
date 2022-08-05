import React, { useState, useEffect, useRef } from 'react';

/**
 *
 * @returns
 */
export default function SignUp() {
	const reference = useRef();

	const [username, setUsername] = useState('');
	const [validUsername, setValidUsername] = useState(false);

	const [passwd, setPasswd] = useState('');
	const [validPasswd, setValidPasswd] = useState(false);

	const [matchPasswd, setMatchPasswd] = useState('');
	const [validMatch, setValidMatch] = useState(false);

	const [errMsg, setErrMsg] = useState('');

	useEffect(() => reference.current.focus(), []);

	useEffect(() => {
		let condition = false;
		setValidUsername(condition);
	}, [username]);

	useEffect(() => {
		let condition = false;
		setValidPasswd(condition);
		setValidMatch(passwd === matchPasswd);
	}, [passwd, matchPasswd]);

	//TODO: Add Sign up modal
	return <div>signup</div>;
}
