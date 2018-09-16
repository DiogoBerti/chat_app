var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate the correct message object', () =>{
		var from = 'Jen';
		var text = 'some message';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text});
	});
});

describe('generateLocationMessage', () => {
	it('Should generate the correct Location object', () =>{
		var from = 'Dio';
		var latitude = 666;
		var longitude = -666;
		var url = 'https://www.google.com.br/maps?q=666,-666';

		var message = generateLocationMessage(from, latitude, longitude)

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,url});

	});
});