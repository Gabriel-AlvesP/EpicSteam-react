import GamesCarousel from '../components/GamesCarousel';
import NewGame from '../components/NewGame';

export default function Home() {
	return (
		<div>
			<div className="mb-5">
				<h1>Home</h1>
			</div>
			<div className="mt-5 mb-5 pb-5">
				<GamesCarousel />
			</div>
			<div>
				<NewGame />
			</div>
		</div>
	);
}
