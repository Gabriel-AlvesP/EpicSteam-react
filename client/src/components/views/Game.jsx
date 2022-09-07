import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axios } from '../../services/apis/axios';
import { Row, Col, Container } from 'react-bootstrap';
import Image from '../images/Image';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';
import './Game.css';

export default function Game() {
	const { gameId } = useParams();
	const navigate = useNavigate();
	//Variables
	const [game, setGame] = useState({});
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				let res = await axios(`/games/game/${gameId}`);
				setGame(res?.data);

				res = await axios(`/games/game/players/${gameId}`);
				setPlayers(res?.data);
			} catch (err) {
				if (err.response?.status === 404) return navigate('/notfound');

				toast.error(handleError(err, `Game content couldn't be loaded.`));
			}
		};

		getData();
	}, [gameId, navigate]);

	return (
		<Container fluid className="mt-3">
			<Row>
				<Col className="ps-0">
					<Row>
						<Image
							src={game.cover}
							alt={`${game.title} cover`}
							style={{
								width: '95%',
								height: '420px',
								objectFit: 'cover',
								borderRadius: '35px',
							}}
						/>
					</Row>
					<Row
						style={{
							width: '100%',
							textAlign: 'center',
						}}
					>
						<p className="gameTitle mt-1 mb-2">{game.title}</p>
					</Row>
					<Row className="mt-0 me-0 pe-0 ms-0 gameDescriptionRow">
						<Col
							lg={8}
							className="ps-0 gameDescription"
							style={{ color: '#fff' }}
						>
							{game.description}
						</Col>
						<Col className="pe-0 mb-2 gameAttribute">
							{game.price ? `€ ${game.price}` : 'Free'}
						</Col>
					</Row>
					<Row className="mt-2  me-0 pe-0 ms-0 gameAttributesRow">
						<Col className="ps-0 gameAttributeName">Likes</Col>
						<Col className="pe-0 mb-2 gameAttribute">{game.upVotes}</Col>
					</Row>
					<Row className="mt-2 me-0 pe-0 ms-0 gameAttributesRow">
						<Col className="ps-0 gameAttributeName">Dislikes</Col>
						<Col className="pe-0 mb-2 gameAttribute">{game.downVotes}</Col>
					</Row>
					<Row className="mt-2 ms-0 gameAttributesRow">
						<Col className="ps-0 gameAttributeName">Publish by</Col>
						<Col className="pe-0 mb-2 gameAttribute">{game.username}</Col>
					</Row>
					<Row className="mt-2 ms-0 gameAttributesRow">
						<Col className="ps-0 gameAttributeName">Publish Date</Col>
						<Col className="pe-0 mb-2 gameAttribute">
							{game.postDate?.split('T')[0].replaceAll('-', '/')}
						</Col>
					</Row>
					<Row className="mt-2 ms-0 gameDescriptionRow">
						<Col className="ps-0">Have you played it?</Col>
						<Col className="pe-0 mb-2 gameAttribute playersListBtn">
							See who played it
						</Col>
					</Row>
				</Col>
				<Col md={9} lg={9} className="ps-0">
					<Row>
						<Image
							src={game.banner}
							alt={`${game.title} banner`}
							style={{
								width: '100%',
								height: '600px',
								objectFit: 'cover',
								borderRadius: '35px',
							}}
						/>
					</Row>
					<Row>
						<p style={{ textAlign: 'center' }}>{game.description}</p>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
