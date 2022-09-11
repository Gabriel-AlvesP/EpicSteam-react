import { Row } from 'react-bootstrap';

/**
 * Comments component
 * @returns
 */
//TODO
const Comments = () => {
	return (
		<Row className="mt-3" style={{ margin: '0 auto' }}>
			<h3 className="ps-1">Comments</h3>
			<div>
				<p className="pt-3" style={{ borderTop: '1px solid #757575' }}>
					Get comments
				</p>
				<p>Write a comment</p>
			</div>
		</Row>
	);
};

export default Comments;
