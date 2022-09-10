import { CategoriesCarousel } from '../Categories/CategoriesCarousel';
import GamesCollection from '../Games/GamesCollection';

export default function Browse() {
	return (
		<div>
			<div className="mt-3 mb-5 pb-4">
				<CategoriesCarousel />
			</div>

			<div>
				<div>
					<GamesCollection addGame={true} />
				</div>
			</div>
		</div>
	);
}
