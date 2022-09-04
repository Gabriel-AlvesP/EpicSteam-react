import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GamesGroup from './GamesGroup';
import { axios } from '../../services/apis/axios';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';

const GroupCollection = () => {
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
					<GamesGroup title="Most Played" games={mostPlayed} />
				</Col>
				<Col
					style={{
						borderLeft: '1px solid #757575',
						borderRight: '1px solid #757575',
					}}
				>
					<GamesGroup title="Most Liked" games={mostLiked} />
				</Col>
				<Col>
					<GamesGroup title="Recently Added" games={mostRecent} />
				</Col>
			</Row>
		</Container>
	);
};

export default GroupCollection;
