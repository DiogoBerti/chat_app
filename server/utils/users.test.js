let expect = require('expect');

let {Users} = require('./users');

describe('Users', () => {
	
	var users;

	beforeEach(() =>{
		users = new Users();
		users.users = [
			{
				id: '1',
				name: 'Mike',
				room: 'Node Course'
			},{
				id: '2',
				name: 'Ana',
				room: 'Node Course'
			},{
				id: '3',
				name: 'Gabriel',
				room: 'React Course'
			}
		]
	});


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

	it('Should return names for Node Course', () => {
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['Mike', 'Ana']);

	});

	it('Should return names for React Course', () => {
		var userList = users.getUserList('React Course');
		expect(userList).toEqual(['Gabriel']);

	});

	it('Should Remove a User', () =>{
		var userId = '2';
		var user_test = users.removeUser(userId);

		expect(user_test[0].id).toBe(userId);
		expect(users.users.length).toBe(2);

	});

	it('Should Not Remove a User', () =>{
		var userId = '555';
		var user_test = users.removeUser(userId);

		expect(user_test[0]).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('Should Find a User', () =>{
		var userId = '2';
		var user_test = users.getUser(userId);

		expect(user_test[0].id).toBe(userId);
	});

	it('Should Not Find a User', () =>{
		var userId = '666';
		var user_test = users.getUser(userId);

		expect(user_test[0]).toNotExist();
	});



});