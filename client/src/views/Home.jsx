import GamesCarousel from '../components/Games/GamesCarousel';
import CardsCollection from '../components/Games/CardsCollection';

export default function Home() {
	return (
		<div>
			<div className="mt-3 mb-5 pb-5">
				<GamesCarousel />
			</div>
			<div>
				<CardsCollection />
			</div>
		</div>
	);
}
