import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from '../images/Image';

const TypeCollection = ({ title, games }) => {
	return (
		<Col>
			<Row className="pb-4">
				<Col>
					<h6 style={{ textAlign: 'left', marginLeft: '5px' }}>{title}</h6>
				</Col>
				<Col>
					{/* TODO: add filter*/}
					{/* TODO: Add css file with hover animations */}
					<Link
						to="/browse"
						style={{
							textAlign: 'right',
							textDecoration: 'none',
							color: '#ff7800',
						}}
					>
						See more
					</Link>
				</Col>
			</Row>
			<Row xs={1} md={1} className="g-4">
				{games.map((game, idx) => (
					<Col key={idx}>
						{/* Add hover style/animation */}
						<Link
							style={{ textDecoration: 'none', color: '#fff' }}
							to={`/games/${game.Id}`}
						>
							<Row>
								<Col className="ps-4 pe-0" style={{ textAlign: 'left' }}>
									<Image
										src={game.Photo}
										style={{
											objectFit: 'cover',
											width: '100px',
											height: '150px',
											borderRadius: '15px',
										}}
										alt={game.Title}
									/>
								</Col>

								<Col
									className="ps-0"
									style={{
										textAlign: 'left',
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
									}}
								>
									<p>{game.Title}</p>
									<p>{game.Price ? `${game.Price}€` : 'Free'}</p>
								</Col>
							</Row>
						</Link>
					</Col>
				))}
			</Row>
		</Col>
	);
};

export default TypeCollection;
