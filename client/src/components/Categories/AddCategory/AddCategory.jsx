import { useState } from 'react';
import { useAccessToken } from '../../../services/hooks/useAccessToken';
import MyModal from '../../MyModal';
import ContentHandler from './ContentHandler';
import Button from 'react-bootstrap/Button';

/**
 * Facilitates the creation of new categories providing the button,
 * modal and content to show
 * @returns
 */
const AddCategory = () => {
	const [showModal, setShowModal] = useState(false);
	const verifyRoles = useAccessToken();

	return (
		<>
			{verifyRoles([1889]) && (
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
							New Category
						</Button>
					</div>
					<MyModal
						title={'New Category'}
						body={<ContentHandler setShowModal={setShowModal} />}
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				</>
			)}
		</>
	);
};

export default AddCategory;
