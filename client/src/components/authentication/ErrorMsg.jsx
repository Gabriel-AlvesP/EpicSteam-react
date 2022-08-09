import React, { useState, useEffect } from 'react';

export default function ErrorMsg(props) {
	const [errMsg, setErrMsg] = useState('');
	const [msgStyle, setMsgStyle] = useState({
		margin: 'auto',
		width: '100%',
		color: '#FF0000',
		textAlign: 'center',
	});

	useEffect(() => {
		setErrMsg(props.errorMsg);
	}, [props.errorMsg]);

	useEffect(() => {
		if (errMsg.length > 0)
			setMsgStyle(prevStyle => ({ ...prevStyle, paddingBottom: '30px' }));
		else setMsgStyle(prevStyle => ({ ...prevStyle, paddingBottom: '0' }));
	}, [errMsg]);
	return <div style={msgStyle}>{errMsg}</div>;
}
