import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { pubAxios } from '../services/api/axios';

export default function GamesCarousel() {
	const [games, setGames] = useState([]);

	useEffect(() => {
		const getItems = async () => {
			try {
				const res = await pubAxios('/games/mostPlayed');
				setGames(res.data.mostPlayed?.slice(0, 5));
			} catch (err) {
				//TODO: Error handling
			}
		};

		getItems();
	}, []);

	return (
		<Carousel>
			{games.forEach(game => {
				<Carousel.Item>
					<img className="d-block w-100" src={game.Photo} alt={game.Title} />
					<Carousel.Caption>
						<h3>{game.Title}</h3>
						<p>{game.Description}</p>
					</Carousel.Caption>
				</Carousel.Item>;
			})}
		</Carousel>
	);
}
