import GamesCarousel from '../components/Games/GamesCarousel';
import GroupCollection from '../components/Games/GroupCollection';

export default function Home() {
	return (
		<>
			<div className="mt-3 mb-5 pb-4">
				<GamesCarousel />
			</div>
			<div>
				<GroupCollection />
			</div>
		</>
	);
}
