import { useState } from 'react';
import { useAccessToken } from '../../../services/hooks/useAccessToken';
import Button from 'react-bootstrap/Button';
import MyModal from '../../MyModal';
import Content from './Content';
import './AddGame.css';

const AddGame = ({ categoryId }) => {
	const [showModal, setShowModal] = useState(false);
	const verifyRoles = useAccessToken();

	return (
		<>
			{verifyRoles([1889, 5204]) && (
				<>
					<div className="d-flex justify-content-end">
						<Button
							style={{
								color: 'white',
								background: '#ff7800',
								border: 'none',
							}}
							onClick={() => setShowModal(true)}
						>
							New Game
						</Button>
					</div>
					<MyModal
						title={'New Game'}
						body={<Content categoryId={categoryId} />}
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</>
			)}
		</>
	);
};

export default AddGame;
