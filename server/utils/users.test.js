let expect = require('expect');

let {Users} = require('./users');

describe('addUser', () => {
	it('Should Add a new User to Users', () =>{
		let users = new Users();

		let user = {
			id: '123',
			name: 'Diogo',
			room: 'Brutal'
		};

		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
		
	});
});