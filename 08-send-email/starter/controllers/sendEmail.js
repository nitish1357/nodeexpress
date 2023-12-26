const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'vena51@ethereal.email',
      pass: 'WgFg16UTbSsxwDcwYz',
    },
  });

  let info = await transporter.sendMail({
    from: '"Nitish Mehta" <nitish@gmail.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Sending emails with node js</b>', // html body
  });

  res.json(info);
};

module.exports = sendEmail;
