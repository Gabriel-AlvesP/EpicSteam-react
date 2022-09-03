import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TypeCollection from './TypeCollection';
import { axios } from '../../services/apis/axios';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';

const CardsCollection = () => {
	const [mostLiked, setMostLiked] = useState([]);
	const [mostPlayed, setMostPlayed] = useState([]);
	const [mostRecent, setMostRecent] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const mostRecentRes = await axios.get('/games/recentlyAdded');
				const mostPlayedRes = await axios.get('/games/mostPlayed');
				const mostLikedRes = await axios.get('/games/mostLiked');

				setMostPlayed(mostPlayedRes?.data?.mostPlayed);
				setMostLiked(mostLikedRes?.data?.mostLiked);
				setMostRecent(mostRecentRes?.data?.recentlyAdded);
			} catch (err) {
				toast.error(handleError(err, `Couldn't fetch data from the server.`));
			}
		};

		getData();
	}, []);

	return (
		<Container fluid className="mb-5" style={{ textAlign: 'center' }}>
			<Row>
				<Col>
					<TypeCollection title="Most Played" games={mostPlayed} />
				</Col>
				<Col
					style={{
						borderLeft: '1px solid #757575',
						borderRight: '1px solid #757575',
					}}
				>
					<TypeCollection title="Most Liked" games={mostLiked} />
				</Col>
				<Col>
					<TypeCollection title="Recently Added" games={mostRecent} />
				</Col>
			</Row>
		</Container>
	);
};

export default CardsCollection;
