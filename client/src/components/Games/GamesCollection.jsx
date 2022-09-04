import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { axios } from '../../services/apis/axios';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';
import Image from '../images/Image';

const GamesCollection = () => {
	const [games, setGames] = useState([]);

	useEffect(() => {
		const getGames = async () => {
			try {
				const res = await axios.get('/games');
				setGames(res?.data?.games);
			} catch (err) {
				toast.error(handleError(err, `Content couldn't be loaded.`));
			}
		};

		getGames();
	}, []);

	return (
		games?.length > 0 && (
			<Container style={{ width: '80%', marginLeft: '0%' }}>
				<Row sm={2} md={3} lg={5}>
					{games.map(game => (
						<Col>
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
						</Col>
					))}
				</Row>
			</Container>
		)
	);
};

export default GamesCollection;
