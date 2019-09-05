const express = require('express');
const user = require('./middlewares/user')
const application = express();

const bodyParser = require('body-parser');

application.use(bodyParser.json());
// adding middlewares.
application.use('/users',user);

application.use(function(request, response) {
	let message = {message : 'invalid'};
	response.set({
		'content-type' : 'application/json',
		'status' : '404'
	}).send({
		message
	});
});

application.listen(3000);
