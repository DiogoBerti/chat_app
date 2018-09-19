// addUser(id, name, room)

// removeUser(id)

// getUser(id)

// getUserList(room)


class Users{
	constructor(){
		this.users = [];
	}

	addUser(id, name, room){
		let user = {id,name,room};
		this.users.push(user);
		return user;
	}
}

module.exports = {Users};










// class Person {
// 	// Construtor de função
// 	constructor(name, age){
// 		this.name = name;
// 		this.age = age;
// 	}

// 	// Metodo de classe...
// 	getUserDescription(){
// 		return `${this.name} is ${this.age} year(s) Old`
// 	}
// }

// var me = new Person('Diogo', 30);
// console.log(me);
// console.log(me.getUserDescription());