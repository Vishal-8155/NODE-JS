const sendinBlue = require('sib-api-v3-sdk');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const body = bodyParser.urlencoded({ extended: true })
const port = 4000; // Choose your desired port

app.use(express.json());

app.set('view engine', 'ejs');

// Instantiate the API client
const defaultClient = sendinBlue.ApiClient.instance;

// Configure API key authorization
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

// Create an instance of the TransactionalEmailsApi class
const apiInstance = new sendinBlue.TransactionalEmailsApi();

// Generate a random OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

app.get('/', async (req, res) => {

    res.render('index');

})

// Endpoint to send OTP email
app.post('/send-otp', body, (req, res) => {
    const email = req.body.email; // Assuming the email is sent in the request body

    let OTP = generateOTP();

    // Define your email parameters
    const sendSmtpEmail = new sendinBlue.SendSmtpEmail();
    sendSmtpEmail.subject = 'Your OTP Code';
    sendSmtpEmail.htmlContent = `ADMINPANEL, Author(VISHAL) Your OTP code is: ${OTP}`;
    sendSmtpEmail.sender = { name: 'Vishal chavda', email: 'sender@domain.com' };
    sendSmtpEmail.to = [{ email: email }];

    // Send the email
    apiInstance.sendTransacEmail(sendSmtpEmail)
        .then(response => {
            console.log('Email sent successfully:', response);
            console.log(OTP);
            res.json({ message: 'OTP email sent successfully' });
        })
        .catch(error => {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        });
});

// Your other routes and middlewares can go here

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
