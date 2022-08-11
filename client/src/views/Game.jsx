import { useParams } from 'react-router-dom';

export default function Game() {
	const { id } = useParams();
	return <div>Game {id}</div>;
}
