import { useParams } from 'react-router-dom';

export default function Profile() {
	//TODO: Use to load user content
	const { id } = useParams();
	return <div>{id} Profile</div>;
}
