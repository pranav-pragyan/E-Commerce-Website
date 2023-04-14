const nodemailer = require("nodemailer");

const sendEmail = async (option) =>
{
   
    const tranporter = nodemailer.createTransport({
      service :process.env.SERVICE,
      port: 465,  // gmail port : 465
      secure: true,
      auth : {user :process.env.SENDER_MAIL, pass : process.env.SENDER_PASSWORD},
    });

    const mailOptions = {
      from :process.env.SENDER_MAIL,
      to : option.email,
      subject : option.subject,
      text : option.message,
    }

    await tranporter.sendMail(mailOptions, function(err, info) {
      if (err) 
        console.log(err)
      else 
        console.log('Email sent: ' + info.response);
    });
};

module.exports = sendEmail;