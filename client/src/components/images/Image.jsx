import { axios } from '../../services/api/axios';

const Image = ({ src, alt, style }) => {
	const image = `${axios.defaults.baseURL}/picture/${src}`;
	return <img src={image} style={style} alt={alt} />;
};

export default Image;
