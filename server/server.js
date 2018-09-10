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

// usando o join, podemos juntar os valores para chegar nos locais...
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
// Setando o public para o express
app.use(express.static(publicPath));

// Checa se houve conexão pelo socket
io.on('connection', (socket) =>{
	console.log('new user connected');
	// Checa se o usuario se desconectou da pagina (verificar script do front)
	socket.on('disconnect', () =>{
		console.log('User Disconnected');
	});
});


server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});