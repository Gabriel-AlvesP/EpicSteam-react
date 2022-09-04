import { CategoriesCarousel } from '../components/Categories/CategoriesCarousel';
import GamesCollection from '../components/Games/GamesCollection';

export default function Browse() {
	return (
		<div>
			<div className="mt-3 mb-5 pb-4">
				<CategoriesCarousel />
			</div>

			<div>
				<GamesCollection />
			</div>
		</div>
	);
}
