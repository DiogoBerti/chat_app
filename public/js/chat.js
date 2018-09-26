//Pode ser utilizado quando o node forçar o socket
let socket = io();

function scrollToBottom(){
	// Função que faz o scroll automatico quando as mensagens são inseridas e o usuario está perto do fim do frame
	// Selectors 
	var messages = $('#messages');
	var newMessage = messages.children('li:last-child'); //Busca o ultimo li dentro de messages...
	// Heights
	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');

	var newMessageHeight = newMessage.innerHeight();
	var lastMessageHeight = newMessage.prev().innerHeight();

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}

// Ao logar no server roda essa funcão...
socket.on('connect', function(){
	console.log('Connected to Server');
	// Pega os valores da url...
	var params = $.deparam(window.location.search);

	socket.emit('join', params, function(error){
		if(error){
			// Redireciona para a pagina de login
			alert(error);
			window.location.href = '/'
		}else{
			console.log('no Error!');
		}
	});
});

socket.on('updateUserList', function(users){
	// Adiciona os usuarios na barra lateral...
	var ol = jQuery('<ul></ul>');

	users.forEach(function(user){
		ol.append(jQuery('<li></li>').text(user));
	});
	$('#users').html(ol);
});


socket.on('disconnect', function(){
	// alert('Disconnected from server');

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
	scrollToBottom();

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
	scrollToBottom();
});


// Sobrescreve o comportamento...
$('#message-form').on('submit', function(event){
	event.preventDefault();
	
	socket.emit('createMessage', {
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