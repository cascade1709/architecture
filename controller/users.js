const RabbitMQ = require('../config/rabbitmq');
const mongo = require('../config/mongo');

class verify {

}

class Users extends verify {

	createWalletAccount(params) {
		let content = "";
		let message = 'Congrats, Your Account is created';
		// insert in mongo 
		mongo.insert(params);
		// send email to rabbitmq queue
		this.sendEmail({
			'email_id' : params.email,
			'body' : message
		});
		// send sms to rabbitmq queue
		this.sendSMS({
			'phone' : params.phone,
			'body' : message
		});
		// return to user
		return {
			'message' : "user created."
		};
	}

	async sendEmail(emailData) {
		// sending emailData to rabbitmq with queue name `email`
		await RabbitMQ('email', JSON.stringify(emailData));
	}

	async sendSMS(smsData) {
		// sending smsData to rabbitmq with queue name `phone`
		await RabbitMQ('sms', JSON.stringify(smsData));
	}

}

module.exports = Users;