const amqp = require('amqplib/callback_api');
const conn = 'amqp://localhost';

let chnl = null;

amqp.connect(conn , function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    chnl = channel;
  });
});

module.exports = async (queueName, data) => {
	console.log("dasdsadsa", queueName, data);
   	chnl.sendToQueue(queueName, Buffer.from(data));
}

process.on('exit', (code) => {
   chnl.close();
   console.log(`Closing rabbitmq channel`);
});