import Button from 'react-bootstrap/Button';
import { useAccessAxios } from '../../../services/hooks/useAccessAxios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleError from '../../../utils/errorHandling';

/**
 * Deletes a category
 *
 * @param {number} categoryId
 * @returns
 */
const DeleteCategory = ({ categoryId }) => {
	const accessAxios = useAccessAxios();
	const navigate = useNavigate();

	/**
	 * Makes the request to delete a category
	 * @returns
	 */
	const deleteCategory = async () => {
		if (!categoryId) {
			toast.error(`Couldn't make the request. Try again later.`);
			return;
		}

		try {
			await accessAxios.delete(`/categories/${categoryId}`);
			navigate('/');
			toast.success('Category removed with success.');
		} catch (err) {
			toast.error(
				handleError(err, `Couldn't remove this game. Try again later.`)
			);
		}
	};

	return (
		<div className="d-flex justify-content-end">
			<Button
				style={{
					color: 'white',
					background: '#FF0000',
					border: 'none',
				}}
				onClick={deleteCategory}
			>
				Remove Category
			</Button>
		</div>
	);
};

export default DeleteCategory;
