import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { axios } from '../../services/apis/axios';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';
import Image from '../images/Image';
import { Link } from 'react-router-dom';
import AddGame from './AddGame/AddGame';

/**
 * Shows all games in cards
 * @param {object} properties - [array] gamesList, [object] containerStyle, [string] contentTitle, [boolean] addGame
 * @returns
 */
const GamesCollection = ({
	gamesList,
	containerStyle,
	contentTitle,
	addGame,
}) => {
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
			<Container
				fluid
				style={containerStyle || { width: '80%', marginLeft: '0%' }}
			>
				<Row className="mb-3 mt-1">
					<Col>
						<p style={{ fontSize: '24px' }}>{contentTitle ?? 'Games'}</p>
					</Col>
					{addGame && (
						<Col>
							<AddGame />
						</Col>
					)}
				</Row>
				<Row m={'auto'} md={'auto'} lg={'auto'}>
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
									style={{
										maxWidth: '200px',
										wordBreak: 'break-word',
										textAlign: 'center',
									}}
								>
									{game.title}
								</p>
							</Link>
						</Col>
					))}
					{/* TODO: Add filter col */}
				</Row>
			</Container>
		)
	);
};

export default GamesCollection;
