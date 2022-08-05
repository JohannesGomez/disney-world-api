import sgMail from '@sendgrid/mail';

export const emailWelcome = async (email) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log(email)
     await sgMail.send({
        to: email, // Change to your recipient
        from: 'johannes.gomez@gmail.com', // Change to your verified sender
        subject: 'Welcome Disney World!',
        text: 'Welcome To Disney World!',
        html: '<strong>Welcome To Disney World!!</strong>',
      }); 
  }