const sendinBlue = require('sib-api-v3-sdk');

// Instantiate the API client
const defaultClient = sendinBlue.ApiClient.instance;

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Configure API key authorization
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

// Create an instance of the TransactionalEmailsApi class
const apiInstance = new sendinBlue.TransactionalEmailsApi();

// Define your email parameters
const sendSmtpEmail = new sendinBlue.SendSmtpEmail();
sendSmtpEmail.subject = 'Subject of the email';
sendSmtpEmail.htmlContent = 'HTML content of the email';
sendSmtpEmail.sender = { name: 'Vishal chavda', email: 'sender@domain.com' };
sendSmtpEmail.to = [{ email: 'vishalchavda7781@gmail.com' }];

// Send the email
apiInstance.sendTransacEmail(sendSmtpEmail)
    .then(response => {
        console.log('Email sent successfully:', response);
    })
    .catch(error => {
        console.error('Error sending email:', error);
    });
