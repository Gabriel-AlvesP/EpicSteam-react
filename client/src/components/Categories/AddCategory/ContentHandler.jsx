import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAccessAxios } from '../../../services/hooks/useAccessAxios';
import handleError from '../../../utils/errorHandling';
import { imageValidator } from '../../../utils/validations';

const ContentHandler = ({ setShowModal }) => {
	const [name, setName] = useState('');
	const [icon, setIcon] = useState({});
	const [validIcon, setValidIcon] = useState(false);
	const [errMessage, setErrMessage] = useState('');
	const accessAxios = useAccessAxios();

	useEffect(() => {
		imageValidator(icon.name) ? setValidIcon(true) : setValidIcon(false);
	}, [icon]);

	const submitForm = async e => {
		e.preventDefault();

		if (!validIcon) {
			setErrMessage('Only image files (jpg, jpeg, png) are allowed!');
			return;
		}

		const formData = new FormData();
		formData.append('name', name);
		formData.append('icon', icon);

		try {
			await accessAxios.post('/categories/new', formData, {
				headers: {
					Accept: 'multipart/form-data',
				},
			});

			toast.success(`New category '${name}' successfully created.`);
			setShowModal(false);
		} catch (err) {
			toast.error(handleError(err));
		}
	};
	return (
		<>
			<div>
				<p style={{ color: '#FF0000' }}>{errMessage}</p>
			</div>
			<form className="mt-5 mb-5" onSubmit={submitForm}>
				<div className="inputGroup">
					<input
						className="customInput"
						id="name"
						type="text"
						onChange={e => setName(e.target.value)}
						value={name}
						required
					/>
					<label className="customLabel" htmlFor="name">
						Category Name
					</label>
				</div>
				<div className="inputGroup">
					<input
						id="icon"
						className="customInput"
						type="file"
						name="image"
						accept="image/*"
						multiple={false}
						onChange={e => setIcon(e.target.files[0])}
					/>
					<label className="customLabel" htmlFor="gameImage">
						Select An Image
					</label>
				</div>
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

export default ContentHandler;
