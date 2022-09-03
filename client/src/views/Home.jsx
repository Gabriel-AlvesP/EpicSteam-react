import GamesCarousel from '../components/Games/GamesCarousel';
import CardsCollection from '../components/Games/CardsCollection';

export default function Home() {
	return (
		<>
			<div className="mt-3 mb-5 pb-4">
				<GamesCarousel />
			</div>
			<div>
				<CardsCollection />
			</div>
		</>
	);
}
