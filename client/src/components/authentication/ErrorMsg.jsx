import React, { useState, useEffect } from 'react';
import { signUpHints } from '../../utils/authValidations';

export default function ErrorMsg(props) {
	const [errMsg, setErrMsg] = useState(props.errorMsg ? props.errorMsg : '');
	const [msgStyle, setMsgStyle] = useState({
		margin: 'auto',
		width: '100%',
		color: '#FF0000',
		textAlign: 'center',
	});

	useEffect(() => {
		if (!props.message) {
			if (props.focus && !props.validations[props.focus - 1]) {
				setErrMsg(signUpHints(props.focus));
				setMsgStyle(prevStyle => ({ ...prevStyle, paddingBottom: '30px' }));
			} else {
				setErrMsg('');
				setMsgStyle(prevStyle => ({ ...prevStyle, paddingBottom: '0' }));
			}
			return;
		}

		setErrMsg(props.message);
		setMsgStyle(prevStyle => ({ ...prevStyle, paddingBottom: '30px' }));
	}, [props.message, props.focus, props.validations]);

	return <div style={msgStyle}>{errMsg}</div>;
}
