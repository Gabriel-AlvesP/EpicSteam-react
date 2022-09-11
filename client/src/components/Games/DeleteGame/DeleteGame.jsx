import Button from 'react-bootstrap/Button';
import { useAccessAxios } from '../../../services/hooks/useAccessAxios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleError from '../../../utils/errorHandling';

/**
 * Deletes a game
 * @param {object} properties
 * @returns
 */
const DeleteGame = ({ gameId }) => {
	const accessAxios = useAccessAxios();
	const navigate = useNavigate();

	/**
	 * Makes the request to delete the game
	 * @returns
	 */
	const deleteGame = async () => {
		if (!gameId) {
			toast.error(`Couldn't make the request. Try again later.`);
			return;
		}

		try {
			await accessAxios.delete(`/games/game/${gameId}`);
			navigate('/');
			toast.success('Game removed with success.');
		} catch (err) {
			toast.error(
				handleError(err, `Couldn't remove this game. Try again later.`)
			);
		}
	};

	return (
		<Button
			style={{
				color: 'white',
				background: '#FF0000',
				border: 'none',
			}}
			onClick={deleteGame}
		>
			Remove Game
		</Button>
	);
};

export default DeleteGame;
