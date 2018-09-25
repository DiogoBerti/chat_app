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

	removeUser(id){
	// Retorna o usuario removido
		var user = this.getUser(id);

		if(user){
			this.users = this.users.filter((user) =>{
				return user.id !== id;
			});
		}
		return user;
	}

	getUser(id){
	// Encontrao Usuario pelo Id
		var user = this.users.filter((user) =>{
			return user.id === id;
		})
		return user;
	}

	getUserList(room){
		var users = this.users.filter((user) =>{
			return user.room === room;
		});
		var namesArray = users.map((user) =>{
			return user.name;
		});
		return namesArray;

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