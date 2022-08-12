import { useNavigate } from 'react-router-dom';

const GoBackBtn = props => {
	const navigate = useNavigate();

	const goBack = () => navigate(-1);

	return (
		<a href="#back" onClick={goBack}>
			{props.label ?? 'Go Back'}
		</a>
	);
};

export default GoBackBtn;
