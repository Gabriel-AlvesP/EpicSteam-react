import { axios } from '../../services/apis/axios';

/**
 * Gets images from the server
 * @param {object} properties - [string] src, [string] alt, [object] style
 * @returns
 */
const Image = ({ src, alt, style }) => {
	const image = src ? `${axios.defaults.baseURL}/picture/${src}` : ''; //TODO add default
	return <img src={image} style={style} alt={alt} />;
};

export default Image;
