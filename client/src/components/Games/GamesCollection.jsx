import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { axios } from '../../services/apis/axios';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';
import Image from '../images/Image';
import { Link } from 'react-router-dom';

const GamesCollection = ({ gamesList, containerStyle }) => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		const getGames = async () => {
			if (gamesList) {
				setGames(gamesList);
				return;
			}

			try {
				const res = await axios.get('/games');
				setGames(res?.data?.games);
			} catch (err) {
				toast.error(handleError(err, `Content couldn't be loaded.`));
			}
		};

		getGames();
	}, [gamesList]);

	return (
		games?.length > 0 && (
			<Container style={containerStyle || { width: '80%', marginLeft: '0%' }}>
				<p style={{ fontSize: '24px' }}>Games</p>
				<Row sm={'auto'} md={'auto'} lg={'auto'}>
					{games.map(game => (
						<Col className="mb-3" key={game.id}>
							<Link
								style={{ textDecoration: 'none', color: '#fff' }}
								to={`/games/${game.id}`}
							>
								<Image
									style={{
										width: '200px',
										height: '300px',
										borderRadius: '20px',
										objectFit: 'cover',
									}}
									src={game.cover}
									alt={game.title}
								/>
								<p
									className="pt-2"
									style={{ maxWidth: '200px', wordBreak: 'break-word' }}
								>
									{game.title}
								</p>
							</Link>
						</Col>
					))}
				</Row>
			</Container>
		)
	);
};

export default GamesCollection;
