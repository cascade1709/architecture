const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
const config = require('../config/config');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'email';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.info(" [x] Received %s", msg.content.toString());
            msg = msg.content.toString();
            let emailData = JSON.parse(msg);
            let email = emailData.email_id;
            let bodyContent = emailData.body;

            let transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: config.email.user,
                pass: config.email.pass
              }
            });

            let mailOptions = {
              from: 'soumitra.mukherjee@power2sme.com',
              to: email,
              subject: 'Sending Email using Node.js',
              text: bodyContent
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
        }, {
            noAck: true
        });
    });
});