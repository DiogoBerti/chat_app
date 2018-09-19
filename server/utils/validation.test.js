const expect = require('expect');

const {isRealString} = require('./validation');

describe('IsRealString', () => {
	it('Should check if is a real String', () =>{
		var test = 'Diogo Berti';
		expect(isRealString(test)).toEqual(true);
	});

	it('Should Reject if it is a string with only spaces', () =>{
		var new_test = '     ';
		expect(isRealString(new_test)).toEqual(false);	
	});

	it('Should Reject if it is not a string', () =>{
		var numb = 666;
		expect(isRealString(numb)).toEqual(false);
	});
});