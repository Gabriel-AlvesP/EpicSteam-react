import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axios } from '../services/apis/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleError from '../utils/errorHandling';

export const Category = () => {
	const { id } = useParams();
	const [category, setCategory] = useState({});
	const [games, setGames] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await axios.get(`/categories/${id}`);
				setCategory(res?.data?.category);
				setGames(res?.data?.games);
			} catch (err) {
				if (err.response?.status === 404) return navigate('/notfound');

				toast.error(handleError(err, `Couldn't load content.Try again later`));
			}
		};

		getData();
	}, [id, navigate]);

	return (
		<>
			{category && <h3>{category.name}</h3>}
			<div>{games.length > 0 && games.map(game => <p>{game.title}</p>)}</div>
		</>
	);
};
