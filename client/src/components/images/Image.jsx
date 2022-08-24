import { pubAxios } from '../../services/api/axios';

const Image = props => {
	const image = `${pubAxios.defaults.baseURL}/picture/${props.fileName}`;
	return <img src={image} alt={props.alt} />;
};

export default Image;
