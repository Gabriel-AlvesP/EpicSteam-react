import { useState, useEffect } from 'react';
import { useAuth } from '../../services/hooks/useAuth';
import './Auth.css';
import ErrorMsg from './ErrorMsg';
import SubmitBtn from './SubmitBtn';
import {
	usernameValidator,
	passwdValidator,
} from '../../utils/authValidations';
import { signInReq } from '../../services/api/axios';

export default function SignIn(props) {
	const { setAuth } = useAuth();

	const [username, setUsername] = useState('');
	const [passwd, setPasswd] = useState('');
	const [errMessage, setErrMessage] = useState('');
	const [btnEnable, setBtnEnable] = useState(false);

	/*
	 * Enables the submit button
	 */
	useEffect(() => {
		if (username && passwd) setBtnEnable(true);
		else setBtnEnable(false);
	}, [username, passwd]);

	/**
	 * Handle sign in request
	 * @param {Object} e event
	 */
	const signIn = async e => {
		e.preventDefault();

		if (!usernameValidator.test(username)) {
			setErrMessage(`This user doesn't exist`);
			return;
		}

		if (!passwdValidator.test(passwd)) {
			setErrMessage(`Invalid password`);
			return;
		}

		setErrMessage('');
		let res = await signInReq({ username, passwd });

		if (typeof res !== 'object') {
			setErrMessage(res);
			return;
		}

		const { accessToken } = res;
		setAuth({ username, accessToken });
		setUsername('');
		setPasswd('');
		props.setShow(false);
	};

	return (
		<>
			<ErrorMsg message={errMessage} />
			<form onSubmit={signIn}>
				<div className="loginGroup">
					<input
						id="loginUsername"
						type="text"
						onChange={e => setUsername(e.target.value)}
						value={username}
						required
					></input>
					<label htmlFor="loginUsername">Username or Email</label>
				</div>

				<div className="loginGroup">
					<input
						id="loginPasswd"
						onChange={e => setPasswd(e.target.value)}
						type="password"
						value={passwd}
						required
					></input>
					<label htmlFor="loginPasswd">Password</label>
				</div>

				<div>
					<SubmitBtn btnEnable={btnEnable} action={true} />
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
