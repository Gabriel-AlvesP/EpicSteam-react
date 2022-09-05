import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axios } from '../services/apis/axios';
import { toast } from 'react-toastify';
import handleError from '../utils/errorHandling';

export default function Game() {
	const { id } = useParams();
	const [game, setGame] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const getGame = async () => {
			try {
				const res = await axios(`/games/game/${id}`);
				setGame(res?.data);
			} catch (err) {
				if (err.response?.status === 404) return navigate('/notfound');

				toast.error(handleError(err, `Game content couldn't be loaded.`));
			}
		};

		getGame();
	}, [id, navigate]);

	return (
		<div>
			<h2>{game.title}</h2>
		</div>
	);
}
