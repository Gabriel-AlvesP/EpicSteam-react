import GamesCarousel from '../components/GamesCarousel';

export default function Home() {
	return (
		<div>
			<div className="mb-5">
				<h1>Home</h1>
			</div>
			<div className="mt-5 mb-5 pb-5">
				<GamesCarousel />
			</div>
		</div>
	);
}
