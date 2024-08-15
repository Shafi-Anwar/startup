// utils/email.js
import emailjs from 'emailjs-com';

export const sendEmail = (to, subject, message) => {
  const templateParams = {
    to_email: to,
    subject: subject,
    message: message,
  };

  return emailjs.send('service_0rqwbrn', 'template_u1ks0uc', templateParams, '8UHlL265a6cO4PJpd')
    .then((response) => {
      console.log('Email sent successfully', response);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};
