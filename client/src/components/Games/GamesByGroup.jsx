import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from '../images/Image';

const GamesByGroup = ({ title, games }) => {
	return (
		<Col>
			<Row className="pb-4">
				<Col>
					<h6 style={{ textAlign: 'left', marginLeft: '5px' }}>{title}</h6>
				</Col>
				<Col style={{ textAlign: 'right' }}>
					{/* TODO: Add css file with hover animations */}
					<Link
						to="/browse"
						style={{
							paddingRight: '18px',
							textDecoration: 'none',
							color: '#ff7800',
						}}
					>
						See more
					</Link>
				</Col>
			</Row>
			<Row xs={1} md={1} className="g-4">
				{games.map(game => (
					<Col key={game.id}>
						{/* TODO: Add hover style/animation */}
						<Link
							style={{ textDecoration: 'none', color: '#fff' }}
							to={`/games/${game.id}`}
						>
							<Row>
								<Col className="ps-4" style={{ textAlign: 'left' }}>
									<Image
										src={game.cover}
										style={{
											objectFit: 'cover',
											width: '100px',
											height: '150px',
											borderRadius: '15px',
										}}
										alt={game.title}
									/>
								</Col>

								<Col
									md={'auto'}
									lg={7}
									className="ps-0"
									style={{
										textAlign: 'left',
										display: 'flex',
										justifyContent: 'center',
										flexDirection: 'column',
									}}
								>
									<p>{game.title}</p>
									<p>{game.price ? `${game.price} €` : 'Free'}</p>
								</Col>
							</Row>
						</Link>
					</Col>
				))}
			</Row>
		</Col>
	);
};

export default GamesByGroup;
