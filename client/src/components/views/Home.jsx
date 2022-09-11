import GamesCarousel from '../Games/GamesCarousel';
import GroupCollection from '../Games/GroupCollection';

/**
 * Home page component
 * @returns
 */
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
