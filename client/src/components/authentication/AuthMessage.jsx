import React, { useState, useEffect } from 'react';
import { signUpHints } from '../../utils/validations';

/**
 * Handles the error/success message that is shown during and
 * after the authentication process
 * @param {object} props properties
 * @returns
 */
export default function AuthMessage(props) {
	const [message, setMessage] = useState('');
	const [msgStyle, setMsgStyle] = useState({
		margin: 'auto',
		width: '100%',
		color: '#FF0000',
		textAlign: 'center',
	});

	useEffect(() => {
		if (!props.message) {
			//Message display with focus and validations
			if (props.focus && !props.validations[props.focus - 1]) {
				setMessage(signUpHints(props.focus));
				setMsgStyle(prevStyle => ({
					...prevStyle,
					color: '#FF0000',
					paddingBottom: '30px',
				}));
			} else {
				setMessage('');
				setMsgStyle(prevStyle => ({ ...prevStyle, paddingBottom: '0' }));
			}
			return;
		}

		//Message display with a direct message
		setMessage(props.message);
		if (props?.success) {
			setMsgStyle(prevStyle => ({
				...prevStyle,
				paddingBottom: '30px',
				color: '#3F784C',
			}));
		} else {
			setMsgStyle(prevStyle => ({
				...prevStyle,
				paddingBottom: '30px',
				color: '#FF0000',
			}));
		}
	}, [props.message, props.focus, props.validations, props.success]);

	return <div style={msgStyle}>{message}</div>;
}
