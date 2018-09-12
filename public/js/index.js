//Pode ser utilizado quando o node forçar o socket
let socket = io();

// Ao logar no server roda essa funcão...
socket.on('connect', function(){
	console.log('Connected to Server');

	// // Envia um objeto para o server, que vai receber na funcão on...
	// socket.emit('createEmail', {
	// 	to: "diogo.cordeiro@teste.com",
	// 	text: "Testando o Teste"
	// });


});

socket.on('disconnect', function(){
	alert('Disconnected from server');
});



// Recebendo um email vindo do emit do server..
socket.on('newMessage', function(data){
	console.log(data);
});