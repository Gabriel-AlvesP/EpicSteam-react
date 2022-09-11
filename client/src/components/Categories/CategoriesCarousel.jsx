import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../services/apis/axios';
import Slider from 'react-slick';
import Image from '../images/Image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CategoriesCarousel.css';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';
import AddCategory from './AddCategory/AddCategory';
import { Row, Col } from 'react-bootstrap';

/**
 * Carousel with all categories
 * @returns
 */
export const CategoriesCarousel = () => {
	const [categories, setCategories] = useState([]);
	const [drag, setDrag] = useState(false);
	const navigate = useNavigate();
	//React-slick settings
	const settings = {
		className: 'center',
		infinite: true,
		centerPadding: '60px',
		slidesToShow: 4,
		swipeToSlide: true,
		speed: 500,
		autoplay: true,
		autoplaySpeed: 4500,
		pauseOnHover: true,
	};

	/**
	 * Gets and sets categories
	 */
	useEffect(() => {
		const getCategories = async () => {
			try {
				const res = await axios('/categories');
				setCategories(res?.data?.categories);
			} catch (err) {
				toast.error(handleError(err, `Couldn't fetch data from the server.`));
			}
		};
		getCategories();
	}, []);

	/**
	 * Distinguish cards drag and click
	 */
	const wasDragged = () => {
		window.addEventListener('mousemove', () => {
			setDrag(true);
		});
		setDrag(false);
	};

	return (
		categories?.length > 0 && (
			<div>
				<Row>
					<Col>
						<p style={{ fontSize: '24px' }}>Categories</p>
					</Col>
					<Col>
						<AddCategory />
					</Col>
				</Row>
				<Slider style={{ textAlign: 'center' }} {...settings}>
					{categories.map(category => (
						<div
							onMouseDown={wasDragged}
							onClick={() => !drag && navigate(`/categories/${category.id}`)}
							key={category.id}
							className="carouselLink"
						>
							<Image
								style={{
									objectFit: 'cover',
									width: '90%',
									margin: '0 auto',
									height: '200px',
									borderRadius: '15px',
								}}
								alt={`${category.name} picture`}
								src={category.icon}
							/>
							<p className="mt-1">{category.name}</p>
						</div>
					))}
				</Slider>
			</div>
		)
	);
};
