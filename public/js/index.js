//Pode ser utilizado quando o node forçar o socket
let socket = io();

// Ao logar no server roda essa funcão...
socket.on('connect', function(){
	console.log('Connected to Server');
});

socket.on('disconnect', function(){
	alert('Disconnected from server');
});

// Recebendo um email vindo do emit do server..
socket.on('newMessage', function(data){
	console.log(data);
	var li = $('<li></li>');
	li.text(`${data.from}: ${data.text}`);
	$('#messages').append(li);
});


// Sobrescreve o comportamento...
$('#message-form').on('submit', function(event){
	event.preventDefault();
	socket.emit('createMessage', {
		from: "User",
		text: $('[name=message]').val()
	}, function(){

	});
});

var locationButton = $('#send_location');
locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.');
	}

	navigator.geolocation.getCurrentPosition(function(postion){
		console.log(postion);
		socket.emit('createLocationMessage', {
			latitude: postion.coords.latitude,
			longitude: postion.coords.longitude
		});
	}, function(error){
		alert('Unable to fetch the location... ', error);
	});

});