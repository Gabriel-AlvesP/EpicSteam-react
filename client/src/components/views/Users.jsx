import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useEffect } from 'react';
import { useAccessAxios } from '../../services/hooks/useAccessAxios';
import { useAuth } from '../../services/hooks/useAuth';
import { timeSince } from '../../utils/timeHandler';
import './Users.css';
import { toast } from 'react-toastify';
import handleError from '../../utils/errorHandling';

export default function Users() {
	const [users, setUsers] = useState([]);
	const [err, setErr] = useState('');
	const { auth } = useAuth();
	const accessAxios = useAccessAxios();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const handleUsers = async () => {
			try {
				const res = await accessAxios.get(`/users`, {
					signal: controller.signal,
				});
				isMounted && setUsers(res.data);
			} catch (err) {
				if (err?.response?.status === 0) {
					setErr('No server response');
					return;
				}

				if (err?.message !== 'canceled')
					setErr(err?.response?.message || 'Error loading users');
			}
		};

		handleUsers();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [accessAxios]);

	const deleteUser = async e => {
		let user = users.find(elm => e.target.value === elm.username);
		if (!user) toast.error('User was not found.');

		try {
			await accessAxios.delete(`/users/${user.id}`);
			setUsers(prevUsers =>
				prevUsers.filter(elem => elem.username !== user.username)
			);
		} catch (err) {
			toast.error(
				handleError(err, `Couldn't delete the user ${user.username}`)
			);
		}
	};

	return (
		<>
			<Container fluid>
				{err.length > 0 ? (
					<h1>{err}</h1>
				) : (
					<div
						className="mt-4 pt-5 pe-5 ps-5 pb-5"
						style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '25px' }}
					>
						<table className="">
							<thead className="tableHeader">
								<tr>
									<th className="colTitle pb-2 ps-2">Username</th>
									<th className="colTitle pb-2 ps-2">Email</th>
									<th className="colTitle pb-2 ps-2">Role</th>
									<th className="colTitle pb-2 ps-2">User since</th>
									<th className="colTitle pb-2 ps-2">Action</th>
								</tr>
							</thead>
							<tbody className="pt-4">
								{users?.map(elem => (
									<tr className="trHover mt-4 mb-4" key={elem.username}>
										<td className="pt-2 pb-2 ps-2">{elem.username}</td>
										<td className="pt-2 pb-2 ps-2">{elem.email}</td>
										<td className="pt-2 pb-2 ps-2">
											{elem.roles.map((role, idx) => {
												let msg =
													role === 1899
														? 'Forum Manager'
														: role === 666
														? 'Visitor '
														: 'Content Manager';
												if (elem.roles.length - 1 !== idx) msg += ', ';
												return msg;
											})}
										</td>
										<td className="pt-2 pb-2 ps-2">
											{timeSince(elem.joinDate)}
										</td>
										<td className="pt-2 pb-2 ps-2">
											{auth?.username !== elem.username && (
												<button
													value={elem.username}
													onClick={deleteUser}
													className="deleteUserBtn"
													style={{
														color: '#fff',
														background: '#FF0000',
														width: '80%',
													}}
												>
													Delete
												</button>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Container>
		</>
	);
}
