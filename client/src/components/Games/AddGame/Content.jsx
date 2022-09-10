import { useState, useEffect } from 'react';
import { imageValidator } from '../../../utils/validations';
import { ProgressBar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { axios } from '../../../services/apis/axios';
import { useAccessAxios } from '../../../services/hooks/useAccessAxios';
import { useNavigate } from 'react-router-dom';

//TODO
const NewGameContent = ({ categoryId }) => {
	//Input variables
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [cover, setCover] = useState({});
	const [validCover, setValidCover] = useState(false);
	const [banner, setBanner] = useState({});
	const [validBanner, setValidBanner] = useState(false);
	const [price, setPrice] = useState(0.0);
	const [selectedCategories, setSelectedCategories] = useState([]);
	//Dropdown elements
	const [categoriesList, setCategories] = useState([]);
	//Err
	const [errMessage, setErrMessage] = useState('');
	//Form
	const [uploadStatus, setUploadStatus] = useState(0);
	//Request
	const accessAxios = useAccessAxios();
	//Navigate
	const navigate = useNavigate();

	useEffect(() => {
		if (!categoryId) {
			const getCategories = async () => {
				try {
					const response = await axios.get('/categories');
					setSelectedCategories(response.data.categories[0].Id);
					setCategories(response.data.categories);
				} catch (err) {
					setErrMessage(
						err.response?.data?.message || 'Failed getting categories'
					);
				}
			};

			getCategories();
		}
	}, [categoryId]);

	useEffect(() => {
		imageValidator(cover.name) ? setValidCover(true) : setValidCover(false);
	}, [cover]);

	useEffect(() => {
		imageValidator(banner.name) ? setValidBanner(true) : setValidBanner(false);
	}, [banner]);

	/**
	 *  Handles categories dropdown change
	 * @param {Number} val category id
	 */
	const handleSelectChange = e => {
		let selectedCats = [];
		[...e.target.selectedOptions].forEach(
			option => option.value && selectedCats.push(option.value)
		);
	};

	/**
	 * Handles form submission
	 * @param {Object} e event
	 * @returns
	 */
	const submitForm = async e => {
		e.preventDefault();

		try {
			if (!validCover || !validBanner) {
				setErrMessage('Only image files (jpg, jpeg, png) are allowed!');
				return;
			}

			const formData = new FormData();
			formData.append('cover', cover);
			formData.append('banner', banner);
			formData.append('title', title);
			formData.append('description', description);
			formData.append('price', price);
			formData.append('categories', [categoryId] || selectedCategories);

			setErrMessage('');

			var res = await accessAxios.post('/games/new', formData, {
				onUploadProgress: data => {
					setUploadStatus(Math.round((data.loaded / data.total) * 100));
				},
				headers: {
					Accept: 'multipart/form-data',
				},
			});

			toast.success(`New game '${title}' successfully created.`);
			navigate(`/games/${res?.data.gameId}`);
		} catch (err) {
			setErrMessage('New game failed. Try again later.');
		}
	};

	return (
		<>
			<div>
				<p style={{ color: '#FF0000' }}>{errMessage}</p>
			</div>
			{uploadStatus > 0 ? (
				<ProgressBar animated className="mt-5 mb-5" now={uploadStatus} />
			) : (
				<></>
			)}
			<form className="mt-5 mb-5" onSubmit={submitForm}>
				<div className="inputGroup">
					<input
						className="customInput"
						id="title"
						type="text"
						onChange={e => setTitle(e.target.value)}
						value={title}
						required
					/>
					<label className="customLabel" htmlFor="title">
						Title
					</label>
				</div>

				<div className="inputGroup">
					<input
						id="gameCover"
						className="customInput"
						type="file"
						name="image"
						accept="image/*"
						multiple={false}
						onChange={e => setCover(e.target.files[0])}
					/>
					<label className="customLabel" htmlFor="gameCover">
						Select cover
					</label>
				</div>
				<div className="inputGroup">
					<input
						id="gameBanner"
						className="customInput"
						type="file"
						name="image"
						accept="image/*"
						multiple={false}
						onChange={e => setBanner(e.target.files[0])}
					/>
					<label className="customLabel" htmlFor="gameImage">
						Select banner
					</label>
				</div>
				<div className="inputGroup">
					<input
						id="description"
						className="customInput"
						type="text"
						onChange={e => setDescription(e.target.value)}
						value={description}
						required
					/>
					<label className="customLabel" htmlFor="description">
						Description
					</label>
				</div>
				<div className="inputGroup">
					<input
						id="price"
						className="customInput"
						type="number"
						onChange={e => setPrice(e.target.value)}
						value={price}
						required
					/>
					<label className="customLabel" htmlFor="price">
						Price
					</label>
				</div>
				{!categoryId && categoriesList.length > 0 && (
					<div className="inputGroup">
						<Form.Select
							id="category"
							value={selectedCategories}
							onChange={handleSelectChange}
							size={categoriesList.length}
							multiple={true}
							aria-label="categories"
						>
							{categoriesList.map(elem => (
								<option key={elem.id} value={elem.id}>
									{elem.name}
								</option>
							))}
						</Form.Select>
					</div>
				)}
				<button
					style={{
						borderRadius: 3,
						border: 0,
						color: 'white',
						height: 48,
						width: 300,
						padding: '0 30px',
						fontSize: '18px',
						background: '#ff7800',
					}}
					type="submit"
				>
					Submit
				</button>
			</form>
		</>
	);
};

export default NewGameContent;
