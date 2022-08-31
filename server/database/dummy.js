const bcrypt = require('bcrypt');

const dummyData = async () => {
	const passwd = await bcrypt.hash('Dummy100', 10);
	return [
		[
			'Users',
			'Categories',
			'Categories',
			'Posts',
			'Posts',
			'Comments',
			'Roles',
			'Roles',
			'Roles',
			'User_Roles',
			'User_Roles',
			'User_Roles',
			'Users_Posts',
			'Users_Posts',
		],
		[
			{
				Id: 'Dummy1',
				Username: 'SrBatatinha',
				Email: 'srBatats@batata.com',
				Password: passwd,
				JoinDate: '2022-07-30',
				Picture: '',
			},
			{
				Id: 1,
				Name: 'Adventure',
				Icon: '',
			},
			{
				Id: 2,
				Name: 'Multiplayer',
				Icon: '',
			},
			{
				Id: 1,
				Title: "Uncharted: A Thief's End",
				Photo: 'uncharted4.png',
				Description: 'Naughty Dog - 2016',
				Price: 39.99,
				PostDate: '2022-07-20',
				UpVotes: 1,
				DownVotes: 0,
				Owner: 'Dummy1',
				CategoryId: 1,
			},
			{
				Id: 2,
				Title: 'CSGO',
				Photo: 'csgo.jpg',
				Description: 'Valve - ',
				Price: 0.0,
				PostDate: '2022-07-30',
				UpVotes: 0,
				DownVotes: 1,
				Owner: 'Dummy1',
				CategoryId: 2,
			},
			{
				Id: 1,
				Description: 'Excelente',
				UserId: 'Dummy1',
				PostId: 1,
			},
			{
				Role: 1899,
			},
			{
				Role: 5204,
			},
			{
				Role: 666,
			},
			{
				Role: 1899,
				UserId: 'Dummy1',
			},
			{
				Role: 5204,
				UserId: 'Dummy1',
			},
			{
				Role: 666,
				UserId: 'Dummy1',
			},
			{
				UserId: 'Dummy1',
				PostId: 1,
				DidPlay: true,
			},
			{
				UserId: 'Dummy1',
				PostId: 2,
				DidPlay: true,
			},
		],
	];
};
module.exports = dummyData;
