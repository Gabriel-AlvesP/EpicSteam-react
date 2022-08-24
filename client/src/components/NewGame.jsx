import { privAxios } from '../services/api/axios';
import { useState, useEffect } from 'react';
import { imageValidator } from '../utils/validations';
import { ProgressBar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const NewGame = () => {
	//Input variables
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [file, setFile] = useState({});
	const [price, setPrice] = useState(0.0);
	const [validFile, setValidFile] = useState(false);
	const [category, setCategory] = useState({});
	//Dropdown elements
	const [categoriesList, setCategories] = useState([]);
	//Err
	const [errMessage, setErrMessage] = useState('');
	//Submit status
	const [uploadStatus, setUploadStatus] = useState(0);

	useEffect(() => {
		if (imageValidator(file.name)) {
			setValidFile(true);
		} else {
			setValidFile(false);
		}
	}, [file]);

	useEffect(() => {
		const getCategories = async callback => {
			try {
				const response = await privAxios('/categories');
				setCategory(response.data.categories[0]);
				setCategories(response.data.categories);
			} catch (err) {
				setErrMessage(
					err.response?.data?.message || 'Failed getting categories'
				);
			}
		};

		getCategories();
	}, []);

	const submitForm = async e => {
		e.preventDefault();

		try {
			const formData = new FormData();
			formData.append('image', file);
			formData.append('title', title);

			if (!validFile) {
				setErrMessage('Only image files (jpg, jpeg, png) are allowed!');
				return;
			}

			setErrMessage('');

			const response = await privAxios.post('/games/new', formData, {
				onUploadProgress: data => {
					setUploadStatus(Math.round((data.loaded / data.total) * 100));
				},
				headers: {
					Accept: 'multipart/form-data',
				},
			});

			//TODO Clg
			console.log(response);
		} catch (err) {
			//TODO: Clg - handle error
			console.log(err);
		}
	};

	return (
		<>
			<h2>New Game</h2>
			<div>
				<p>{errMessage}</p>
			</div>
			{uploadStatus > 0 ? (
				<ProgressBar animated className="mt-5 mb-5" now={uploadStatus} />
			) : (
				<></>
			)}
			<form className="mt-5 mb-5" onSubmit={submitForm}>
				<div className="inputGroup">
					<input
						id="title"
						type="text"
						onChange={e => setTitle(e.target.value)}
						value={title}
						required
					/>
					<label htmlFor="title">Title</label>
				</div>

				<div className="inputGroup">
					<input
						id="gameImage"
						type="file"
						name="image"
						accept="image/*"
						multiple={false}
						onChange={e => setFile(e.target.files[0])}
					/>
					<label htmlFor="gameImage">Select image</label>
				</div>
				<div className="inputGroup">
					<input
						id="description"
						type="text"
						onChange={e => setDescription(e.target.value)}
						value={description}
						required
					/>
					<label htmlFor="description">Description</label>
				</div>
				<div className="inputGroup">
					<input
						id="price"
						type="number"
						onChange={e => setPrice(e.target.value)}
						value={price}
						required
					/>
					<label htmlFor="price">Price</label>
				</div>
				<div className="inputGroup">
					<DropdownButton id="category" title={category.Name}>
						{categoriesList.map(element =>
							category.Id === element.Id ? (
								<Dropdown.Item active eventKey={element.Id}>
									{element.Name}
								</Dropdown.Item>
							) : (
								<Dropdown.Item active eventKey={element.Id}>
									{element.Name}
								</Dropdown.Item>
							)
						)}
					</DropdownButton>
				</div>
				<Button>Submit</Button>
			</form>
		</>
	);
};

export default NewGame;
