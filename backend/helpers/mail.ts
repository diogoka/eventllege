import nodemailer from 'nodemailer';

export type EmailOption = {
  to: string[];
  subject: string;
  text: string;
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'eventllege.info@gmail.com',
      pass: process.env.MAIL_PASSWORD
  }
});

export const sendEmail = (option: EmailOption) => {

  const mailOptions = {
    from: 'eventllege.info@gmail.com',
    to: option.to,
    subject: option.subject,
    text: option.text
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
}