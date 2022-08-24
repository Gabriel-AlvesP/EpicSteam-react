import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { pubAxios } from '../services/api/axios';
import Image from './images/Image';

export default function GamesCarousel() {
	const [games, setGames] = useState([]);

	useEffect(() => {
		const getItems = async () => {
			try {
				const res = await pubAxios('/games/mostPlayed');
				setGames(res.data.mostPlayed?.slice(0, 5));
			} catch (err) {
				//TODO: Error handling
				//TODO CLG
				console.log(err);
			}
		};

		getItems();
	}, []);

	useEffect(() => {
		console.log(games);
	}, [games]);

	return (
		<Carousel>
			{games.map(game => (
				<Carousel.Item key={game.Id}>
					<Image
						className="d-block w-100"
						fileName={game.Photo}
						alt={game.Title}
					/>

					<Carousel.Caption>
						<h3>{game.Title}</h3>
						<p>{game.Description}</p>
					</Carousel.Caption>
				</Carousel.Item>
			))}
		</Carousel>
	);
}
