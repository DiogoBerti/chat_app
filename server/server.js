const socketIO = require('socket.io');
const http = require('http');
// Biblioteca que faz o gerenciamento do paths do sistema
const path = require('path');

const express = require('express');
var app = express();
// Cria um server http e usa o app express como argumento no lugar do (req, res)
var server = http.createServer(app);
// Traz o socket para dentro do server
var io = socketIO(server);

// Para checar se é uma string...
const {isRealString} = require('./utils/validation');

// usando o join, podemos juntar os valores para chegar nos locais...
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const {generateMessage, generateLocationMessage} = require('./utils/message');


// Setando o public para o express
app.use(express.static(publicPath));

// Checa se houve conexão pelo socket
io.on('connection', (socket) =>{
	console.log('new user connected');
	
	socket.on('join', (params, callback) =>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			callback('Name and Room name are required');
		}

		socket.join(params.room);
		// socket.leave(params.room);

		socket.emit('newMessage', generateMessage("Admin","Welcome to the Chat"));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin",`${params.name} has Joined!`));
		callback();
	});

	
	// Checa se o usuario se desconectou da pagina (verificar script do front)
	socket.on('disconnect', () =>{
		console.log('User Disconnected');
	});

	socket.on('createMessage', (message, callback) =>{
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

	socket.on('createLocationMessage', (coords) =>{
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

});


server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});