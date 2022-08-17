import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function AuthModal(props) {
	//* [True] sign in : [False] sign up
	const initialContent = props.modalContent;
	const [content, setContent] = useState(props.modalContent);
	const [title, setTitle] = useState('');
	const [body, setBody] = useState(<></>);

	useEffect(() => {
		setContent(initialContent);
	}, [initialContent]);

	useEffect(() => {
		if (content) {
			setTitle('Sign In');
			setBody(<SignIn onNavClick={changeContent} setShow={props.setShow} />);
		} else {
			setTitle('Sign Up');
			setBody(<SignUp onNavClick={changeContent} setShow={props.setShow} />);
		}
	}, [content, props.setShow]);

	const changeContent = () => {
		setContent(prevContent => !prevContent);
	};

	const onExited = () => {
		setContent(initialContent);
	};

	return (
		<Modal
			className="my-modal"
			show={props.show}
			onHide={props.onHide}
			onExited={onExited}
		>
			<Modal.Body>
				<h2 className="auth-title"> {title}</h2>
				<div className="loginContainer">{body}</div>
			</Modal.Body>
		</Modal>
	);
}
