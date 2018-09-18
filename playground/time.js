var moment = require('moment');

let date = moment();
date.add(1,'year').subtract(9,'months');

console.log(date.format('MMM, Do YYYY HH:MM:ss'));
console.log(date.format('h:MM a'))

let createdAt = 456778;
let newDate = moment(createdAt);

console.log(newDate.format('h:MM a'));