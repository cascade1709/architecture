const express = require('express');
const Users = require('../controller/users');
const routers = express.Router();

routers.post('/createWallet', async function(request, response) {
	const userObj = new Users();
	data = userObj.createWalletAccount(request.body);
	response.send(data);
});

// routers.post('/sendSMS', function(request, response){

// });

// routers.post('/sendEmail', function(request, response) {

// });

module.exports = routers;