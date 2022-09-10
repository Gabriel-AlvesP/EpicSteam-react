import { Modal } from 'react-bootstrap';

const MyModal = ({ title, body, showModal, setShowModal }) => {
	return (
		<Modal
			className="my-modal"
			show={showModal}
			onHide={() => setShowModal(false)}
		>
			<Modal.Body>
				<h2 className="auth-title">{title}</h2>
				<div className="loginContainer">{body}</div>
			</Modal.Body>
		</Modal>
	);
};

export default MyModal;
