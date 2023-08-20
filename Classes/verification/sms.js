const accountSid = 'AC3ad31efc36b3f7af716c91364a43b65a';
const authToken = '35f473170dc518c6c44fb0249e962f11';
const client = require('twilio')(accountSid, authToken);

// Generate a random OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

client.messages
    .create({
        body: "VISHAL ADMINPANEL,Your OTP is : "+generateOTP(),
        from: '+17622383110',
        to: '+918155037781'
    })
    .then(message => console.log(message.sid))
    