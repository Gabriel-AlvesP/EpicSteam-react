import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GamesByGroup from './GamesByGroup';
import { axios } from '../../services/apis/axios';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';

/**
 * Joins multiple groups of games (most liked, played and recently added)
 * @returns
 */
const GroupCollection = () => {
	const [mostLiked, setMostLiked] = useState([]);
	const [mostPlayed, setMostPlayed] = useState([]);
	const [mostRecent, setMostRecent] = useState([]);

	/**
	 * Gets the different list of games needed
	 */
	useEffect(() => {
		const getData = async () => {
			try {
				const mostRecentRes = await axios.get('/games/recentlyAdded');
				const mostPlayedRes = await axios.get('/games/mostPlayed');
				const mostLikedRes = await axios.get('/games/mostLiked');

				setMostPlayed(mostPlayedRes?.data?.mostPlayed?.slice(0, 5));
				setMostLiked(mostLikedRes?.data?.mostLiked?.slice(0, 5));
				setMostRecent(mostRecentRes?.data?.recentlyAdded?.slice(0, 5));
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
					<GamesByGroup title="Most Played" games={mostPlayed} />
				</Col>
				<Col
					style={{
						borderLeft: '1px solid #757575',
						borderRight: '1px solid #757575',
					}}
				>
					<GamesByGroup title="Most Liked" games={mostLiked} />
				</Col>
				<Col>
					<GamesByGroup title="Recently Added" games={mostRecent} />
				</Col>
			</Row>
		</Container>
	);
};

export default GroupCollection;
