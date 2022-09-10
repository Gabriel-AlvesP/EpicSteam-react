import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axios } from '../../services/apis/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';
import GamesCollection from '../Games/GamesCollection';
import AddGame from '../Games/AddGame/AddGame';
import { Row, Col } from 'react-bootstrap';
import { useAccessToken } from '../../services/hooks/useAccessToken';
import DeleteCategory from '../Categories/DeleteCategory/DeleteCategory';

export default function Category() {
	const { id } = useParams();
	const [category, setCategory] = useState({});
	const [games, setGames] = useState([]);
	const navigate = useNavigate();
	const checkRoles = useAccessToken();

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
			<Row style={{ width: '100%' }}>
				<Col>
					{category && <h2 className="mt-2 mb-4">{category.name} Games</h2>}
				</Col>
				<Col lg={'auto'} className="pe-0 me-0">
					<div className="mt-2 mb-4">
						<AddGame categoryId={id} />
					</div>
				</Col>
				{checkRoles([1899]) && (
					<Col className="pe-0" lg={'auto'}>
						<div className="mt-2 mb-4">
							<DeleteCategory categoryId={id} />
						</div>
					</Col>
				)}
			</Row>
			{games.length === 0 ? (
				<h3>No games to show</h3>
			) : (
				<GamesCollection
					gamesList={games}
					contentTitle={''}
					containerStyle={{
						width: '100%',
						paddingTop: '1px',
						background: 'rgba(0, 0, 0, 0.4)',
						borderRadius: '20px',
					}}
				/>
			)}
		</>
	);
}
