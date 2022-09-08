import { useState, useEffect } from 'react';
import { useAuth } from '../../services/hooks/useAuth';
import { Col } from 'react-bootstrap';
import { useAccessAxios } from '../../services/hooks/useAccessAxios';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';

const DidPlayBtn = ({ gameId, players, setPlayers }) => {
	const { auth } = useAuth();
	const [didPlay, setDidPlay] = useState(false);
	const [style, setStyle] = useState({
		cursor: 'pointer',
	});
	const accessAxios = useAccessAxios();

	useEffect(() => {
		if (players?.includes(auth?.username)) setDidPlay(true);
		else setDidPlay(false);
	}, [players, auth]);

	useEffect(() => {
		if (!didPlay) {
			setStyle(prev => ({
				...prev,
				color: '#fff',
				textDecoration: 'underline',
			}));
		} else {
			setStyle(prev => ({
				...prev,
				color: '#004C08',
				textDecoration: 'none',
			}));
		}
	}, [didPlay]);

	const toggleDidPlay = e => {
		setDidPlay(prevState => {
			let newState = !prevState;

			const updateDidPlay = async () => {
				try {
					await accessAxios.post('/games/game/players', {
						gameId,
						didPlay: newState,
					});

					newState
						? setPlayers(prevArr => [...prevArr, auth?.username])
						: setPlayers(prevArr =>
								prevArr.filter(username => username !== auth?.username)
						  );
				} catch (err) {
					toast.error(
						handleError(err, `Couldn't update users that play the game.`)
					);
				}
			};

			updateDidPlay();
			return newState;
		});
	};

	return (
		auth?.username && (
			<Col className="ps-0 pb-0">
				<label htmlFor="userDidPlay" style={style}>
					{didPlay ? 'You played it' : 'Have you played it?'}
					<input
						type="checkbox"
						id="userDidPlay"
						value={didPlay}
						onChange={toggleDidPlay}
						style={{ opacity: '0' }}
						checked
					/>
				</label>
			</Col>
		)
	);
};

export default DidPlayBtn;
