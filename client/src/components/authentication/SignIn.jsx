import { useState, useEffect } from 'react';
import { useAuth, usePersist } from '../../services/hooks/useAuth';
import './Auth.css';
import AuthMessage from './AuthMessage';
import SubmitBtn from './SubmitBtn';
import { usernameValidator, passwdValidator } from '../../utils/validations';
import { privAxios } from '../../services/api/axios';
import handleError from '../../utils/errorHandling';
import { FaRegCheckCircle, FaCheckCircle } from 'react-icons/fa';

export default function SignIn(props) {
	//Authentication Context usage
	const { setAuth } = useAuth();
	const { setAuthPersist } = usePersist();

	//User info
	const [username, setUsername] = useState('');
	const [passwd, setPasswd] = useState('');

	//sign in variables
	const [btnEnable, setBtnEnable] = useState(false);
	const [authMessage, setAuthMessage] = useState('');

	//Persistence checkbox
	const [checked, setChecked] = useState(true);
	const [color, setColor] = useState('checked');

	const toggleCheck = () => {
		setChecked(prev => !prev);
	};

	useEffect(() => {
		let color = checked ? 'checked' : '';
		setColor(color);
	}, [checked]);

	/*
	 * Enables the submit button
	 */
	useEffect(() => {
		if (username && passwd) setBtnEnable(true);
		else setBtnEnable(false);
	}, [username, passwd]);

	/**
	 * Handle sign in request
	 * Authenticate as an existing user
	 * @param {Object} e event
	 */
	const signIn = async e => {
		e.preventDefault();
		setAuthMessage('');

		if (!usernameValidator.test(username)) {
			setAuthMessage(`This user doesn't exist`);
			return;
		}

		if (!passwdValidator.test(passwd)) {
			setAuthMessage(`Invalid password`);
			return;
		}

		//Login request
		try {
			const response = await privAxios.post('/login', {
				username,
				passwd,
			});
			const { accessToken } = response.data;

			setAuth({ username, accessToken });
			setAuthPersist(checked);
			localStorage.setItem('persist', checked);

			//clear inputs
			setUsername('');
			setPasswd('');
			//hide modal
			props.setShow(false);
		} catch (err) {
			setAuthMessage(handleError(err, 'Sign in failed'));
		}
	};

	return (
		<>
			<AuthMessage message={authMessage} />
			<form onSubmit={signIn}>
				<div className="inputGroup">
					<input
						id="loginUsername"
						type="text"
						className="customInput"
						onChange={e => setUsername(e.target.value)}
						value={username}
						required
					></input>
					<label className="customLabel" htmlFor="loginUsername">
						Username
					</label>
				</div>
				<div className="inputGroup">
					<input
						id="loginPasswd"
						type="password"
						className="customInput"
						onChange={e => setPasswd(e.target.value)}
						value={passwd}
						required
					></input>
					<label className="customLabel" htmlFor="loginPasswd">
						Password
					</label>
				</div>
				<label htmlFor="persistCheckbox" className={`${color} checkboxWrap`}>
					{checked ? (
						<FaCheckCircle className="checkmark " />
					) : (
						<FaRegCheckCircle className="checkmark " />
					)}
					Stay signed in
					<input
						type="checkbox"
						id="persistCheckbox"
						value={checked}
						onChange={toggleCheck}
						checked
					/>
				</label>
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
