import { useState, useEffect } from 'react';
import { useAuth } from '../../services/hooks/useAuth';
import { useAccessAxios } from '../../services/hooks/useAccessAxios';
import { Row, Col } from 'react-bootstrap';
import { BiLike, BiDislike } from 'react-icons/bi';
import './VotesSection.css';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';

const VotesSection = ({ game, title, setLikes, setDislikes }) => {
	const [fade, setFade] = useState('');
	const [show, setShow] = useState(true);
	const { auth } = useAuth();
	const accessAxios = useAccessAxios();

	useEffect(() => {
		const userVote = async () => {
			if (auth?.username && game) {
				try {
					const res = await accessAxios.get(`/games/game/vote/${game}`);
					res?.data?.vote && setShow(false);
				} catch (err) {
					toast.error(handleError(err));
				}
			}
		};
		userVote();
	}, [accessAxios, game, auth]);

	const onVote = async voteType => {
		if (!auth?.username) {
			toast.info('Sign in to vote posts!');
			return;
		}

		let voteValue = 1;
		if (voteType) {
			setLikes(count => ++count);
		} else {
			setDislikes(count => ++count);
			voteValue = 2;
		}

		try {
			await accessAxios.post(`/games/game/vote/`, {
				vote: voteValue,
				gameId: game,
			});

			setFade('fadeOut');
			setTimeout(() => {
				setShow(false);
			}, 1200);
		} catch (err) {
			toast.error(
				handleError(err, `Couldn't save your vote. Try again later.`)
			);
		}
	};

	return (
		show && (
			<Row
				className={`mt-3 ${fade}`}
				style={{
					background: 'rgba(0, 0, 0, 0.4)',
					borderRadius: '18px',
					margin: '0 auto',
				}}
			>
				<Col lg={6}>
					<p
						className="mt-4 mb-4 "
						style={{
							width: '100%',
						}}
					>
						Do you like this post about "{title}" ?
					</p>
				</Col>
				<Col lg={2} className="voteBtn mt-2 mb-2 me-1">
					<button onClick={() => onVote(true)} className="ghostBtn">
						<Row className="text-center mt-3 mb-3">
							<Col>
								<BiLike style={{ fontSize: '1.6rem', textAlign: 'left' }} />
							</Col>
							<Col
								className="ps-0 "
								style={{ textAlign: 'left', fontSize: '1.1rem' }}
							>
								Yes
							</Col>
						</Row>
					</button>
				</Col>
				<Col lg={2} className="voteBtn mt-2 mb-2 ms-1">
					<button onClick={() => onVote(false)} className="ghostBtn">
						<Row className="text-center mt-3 mb-3">
							<Col>
								<BiDislike style={{ fontSize: '1.6rem', textAlign: 'left' }} />
							</Col>
							<Col
								className="ps-0"
								style={{ textAlign: 'left', fontSize: '1.1rem' }}
							>
								No
							</Col>
						</Row>
					</button>
				</Col>
			</Row>
		)
	);
};

export default VotesSection;
