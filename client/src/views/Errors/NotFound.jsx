import { Link, useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div id="notFound">
			<section className="notFound">
				<div className="img">
					<img
						src="https://assets.codepen.io/5647096/backToTheHomepage.png"
						alt="Back to the Homepage"
						onClick={() => navigate('/')}
						style={{ cursor: 'pointer' }}
					/>
					<img
						src="https://assets.codepen.io/5647096/Delorean.png"
						alt="El Delorean, El Doc y Marti McFly"
						onClick={() => navigate('/')}
						style={{ cursor: 'pointer' }}
					/>
				</div>
				<div className="text">
					<h1>404</h1>
					<h2>PAGE NOT FOUND</h2>
					<h3>BACK TO HOME?</h3>
					<Link to="/" className="yes">
						YES
					</Link>
					<a href="https://www.youtube.com/watch?v=G3AfIvJBcGo">NO</a>
				</div>
			</section>
		</div>
	);
}
