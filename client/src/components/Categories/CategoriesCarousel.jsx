import { useState, useEffect } from 'react';
import { axios } from '../../services/api/axios';
import Slider from 'react-slick';
import Image from '../images/Image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';

export const CategoriesCarousel = () => {
	const [categories, setCategories] = useState([]);
	const settings = {
		className: 'center',
		//centerMode: true,
		infinite: true,
		centerPadding: '60px',
		slidesToShow: 4,
		swipeToSlide: true,
		speed: 500,
		//autoplay: true,
		autoplay: false,
		autoplaySpeed: 4500,
		pauseOnHover: true,
	};

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

	return (
		categories?.length > 0 && (
			<div>
				<h3>Categories</h3>
				<Slider style={{ textAlign: 'center' }} {...settings}>
					{categories.map(category => (
						<div key={category.id}>
							<Image
								style={{
									objectFit: 'cover',
									width: '90%',
									height: '200px',
									borderRadius: '15px',
								}}
								alt={`${category.name} picture`}
								src={category.icon}
							/>
							<h4 className="me-4 pe-2">{category.name}</h4>
						</div>
					))}
				</Slider>
			</div>
		)
	);
};
