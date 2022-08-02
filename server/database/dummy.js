const dummyData = [
	['Users', 'Categories', 'Categories', 'Posts', 'Posts', 'Comments'],
	[
		{
			Id: 1,
			Username: 'SrBatatinha',
			Email: 'srBatats@batata.com',
			Password: '12345678',
			Role: 0,
			JoinDate: '2022-07-30',
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
			Title: "Uncharted:A Thief's End",
			Photo: '/www/images/uncharted4.png',
			Description: 'Naughty Dog - 2016',
			Price: 39.99,
			PostDate: '2022-07-20',
			UpVotes: 1,
			DownVotes: 0,
			Owner: 1,
			CategoryId: 1,
		},
		{
			Id: 2,
			Title: 'CSGO',
			Photo: '/www/images/csgo.jpg',
			Description: 'Valve - ',
			Price: 0.0,
			PostDate: '2022-07-30',
			UpVotes: 0,
			DownVotes: 1,
			Owner: 1,
			CategoryId: 2,
		},
		{
			Id: 1,
			Description: 'Excelente',
			UserId: 1,
			PostId: 1,
		},
	],
];
module.exports.dummyData = dummyData;
