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
	var formattedTime = moment(data.createdAt).format('h:MM a');
	var template = $('#message_template').html();
	var vals = {
		text: data.text,
		from: data.from,
		timeStamp: formattedTime
	}
	var html = Mustache.render(template, vals);
	$('#messages').append(html);

});

socket.on('newLocationMessage', function(message){

	var formattedTime = moment(message.createdAt).format('h:MM a');
	// Usando Mustachejs para criar templates
	var template = $('#location_template').html();
	var vals = {
		url: message.url,
		from: message.from,
		timeStamp: formattedTime
	}
	var html = Mustache.render(template, vals);
	$('#messages').append(html);

});


// Sobrescreve o comportamento...
$('#message-form').on('submit', function(event){
	event.preventDefault();
	
	socket.emit('createMessage', {
		from: "User",
		text: $('[name=message]').val()
	}, function(){
		$('[name=message]').val('');
	});
});

var locationButton = $('#send_location');
locationButton.on('click', function(){
	if(!navigator.geolocation){
		return alert('Geolocation not supported by your browser.');
	}
	// Desabilita o botão...
	locationButton.attr('disabled', 'disabled');
	locationButton.text ('Sending location...');

	navigator.geolocation.getCurrentPosition(function(postion){
		locationButton.removeAttr('disabled');
		locationButton.text('Send Location');
		socket.emit('createLocationMessage', {
			latitude: postion.coords.latitude,
			longitude: postion.coords.longitude
		});
	}, function(error){
		locationButton.removeAttr('disabled');
		locationButton.text('Send Location');
		alert('Unable to fetch the location... ', error);
	});
});