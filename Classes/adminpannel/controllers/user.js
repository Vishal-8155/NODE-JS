const {model,user} = require('../models/mongoosedb');
// const sendinBlue = require('sib-api-v3-sdk');
const express = require('express');
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const saltRounds = 10;

var jwt = require('jsonwebtoken');
const localStorage = require('localStorage');
const secretKey = 'zoy123';

// const accountSid = 'SKaa1cfe2abf0641dfb98da54700c38eae';
// const authToken = 'Gvxu9K5YdAQVWqJcju8ihi06TyD8cci0';
// const client = require('twilio')(accountSid, authToken);

// const accountSid = 'AC3ad31efc36b3f7af716c91364a43b65a'; // Replace with your Twilio Account SID
// const apiKeySid = 'SKaa1cfe2abf0641dfb98da54700c38eae';   // Replace with your Twilio API Key SID
// const apiKeySecret = 'Gvxu9K5YdAQVWqJcju8ihi06TyD8cci0'; // Replace with your Twilio API Key Secret

// const client = require('twilio')(apiKeySid, apiKeySecret, { accountSid: accountSid });

// Rest of your code

const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());

// Instantiate the API client
// const defaultClient = sendinBlue.ApiClient.instance;

// Configure API key authorization
// const apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = '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';

// Create an instance of the TransactionalEmailsApi class
// const apiInstance = new sendinBlue.TransactionalEmailsApi();


// Generate a random OTP
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const rs = (req, res) => {
    if (req.cookies && req.cookies.UserName != "VISHAL") {
        return res.redirect('/admin');
    }
}

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'vishalchavda7781@gmail.com',
        pass: 'vxfxffkwweharzpo',
    },
    secure: true,
});

const main = (req, res) => {

    rs(req, res);
    res.render('index', {
        username: req.cookies.UserName
    });

}

const formdata = (req, res) => {

    rs(req, res);
    res.render('form', {
        username: req.cookies.UserName
    });

}

const login = (req, res) => {

    res.render('login', { message: '' });

}

const forgetpass = (req, res) => {

    res.render('forgetpass', { message3: '' });

}

const logout = (req, res) => {

    res.clearCookie('UserName');
    res.redirect('/admin');

}

const signup = (req, res) => {

    res.render('signup', { message2: '' });

}

const savepass = async (req, res) => {

    if (req.body.newpass && req.body.confirmpass) {

        if (req.body.newpass === req.body.confirmpass) {

            let findemail = await model.findOne({ email: req.body.hiddenContact });

            if (findemail) {

                let data = await model.updateOne(

                    {
                        email: req.body.hiddenContact
                    },
                    {

                        $set:
                        {
                            // password: req.body.newpass
                            otp:"",
                            password: await bcrypt.hash(req.body.newpass, saltRounds)
                        }

                    }

                );

                console.log(data);

                res.redirect('/admin');

            } else {

                let data = await model.updateOne(

                    {
                        number: req.body.hiddenContact
                    },
                    {

                        $set:
                        {
                            otp:"",
                            password: req.body.newpass
                        }

                    }

                );

                console.log(data);

                res.redirect('/admin');

            }

        } else {

            req.flash('success', 'Please Enter Same Password!');
            res.render('resetpass', {
                message4: req.body.hiddenotp,
                message6: req.body.hiddenContact,
                message7: req.flash('success')
            });

        }

    } else {

        req.flash('success', 'Please Enter New Password!');
        res.render('resetpass', {
            message4: req.body.hiddenotp,
            message6: req.body.hiddenContact,
            message7: req.flash('success')
        });

    }

}

const resetpass = async (req, res) => {

    
    const {hiddenContact,otp} = req.body;
    if (otp) {

        let result = await model.findOne({email:hiddenContact})
        console.log(result.otp)
        console.log(otp)
        // console.log(req.body.hiddenotp)

        if (result.otp == otp) {

            res.render('resetpass', {

                // message4: req.body.hiddenotp,
                message6: req.body.hiddenContact,
                message7: ''

            });

        } else {

            req.flash('secondary', 'OTP was Wrong!');
            res.render('otp', {
                // otp: req.body.hiddenotp,
                Contact: req.body.hiddenContact,
                message5: req.flash('secondary')
            });

        }

    } else {

        req.flash('secondary', 'Please Enter OTP!');
        res.render('otp', {
            // otp: req.body.hiddenotp,
            Contact: req.body.hiddenContact,
            message5: req.flash('secondary')
        });

    }

}

const otp = async (req, res) => {

    if (req.body.Contact) {

        let phone = await model.findOne({ number: req.body.Contact });
        let result = await model.findOne({ email: req.body.Contact });

        if (result) {

            const email = req.body.Contact; // Assuming the email is sent in the request body

            let OTP = generateOTP();

            // first method

            const mailInfo = {

                from: "vishalchavda7781@gmail.com",
                to: email,
                subject: "Vishal Chavda Admin Panel",
                text: "For, Reset Password",
                html: `<p>Your OTP is : ${OTP}</p>`

            }

            await transporter.sendMail(mailInfo);

            console.log('Email Sent Successfully');
            result.otp = OTP;
            result.save();
            // user.add({otp:Number});
            // await model.updateOne( {email: email},{ $set: { otp :OTP} });
            console.log('otp saved successfully');

            res.render('otp', {
                // otp: OTP,
                Contact: email,
                message5: ''
            })

            // second method

            // Define your email parameters
            // const sendSmtpEmail = new sendinBlue.SendSmtpEmail();
            // sendSmtpEmail.subject = 'Your OTP Code';
            // sendSmtpEmail.htmlContent = `ADMINPANEL, Author(VISHAL) Your OTP code is: ${OTP}`;
            // sendSmtpEmail.sender = { name: 'Vishal chavda', email: 'sender@domain.com' };
            // sendSmtpEmail.to = [{ email: email }];

            // // Send the email
            // apiInstance.sendTransacEmail(sendSmtpEmail)
            //     .then(response => {
            //         console.log('Email sent successfully:', response);
            //         res.render('otp', {
            //             otp: OTP,
            //             Contact: email,
            //             message5: ''
            //         })
            //     })
            //     .catch(error => {
            //         console.error('Error sending email:', error);
            //         res.status(500).json({ error: 'Error sending email' });
            //     });

        } else if (phone) {

            const mnum = req.body.Contact;

            let phoneotp = generateOTP();

            client.messages
                .create({
                    body: "VISHAL ADMINPANEL,Your OTP is : " + phoneotp,
                    from: '+17622383110',
                    to: `+91${mnum}`
                })
                .then(message => {
                    console.log(message.sid);
                    res.render('otp', {
                        otp: phoneotp,
                        Contact: mnum,
                        message5: ''
                    })
                })

        } else {

            req.flash('warning', 'Contact is not Registered!');
            res.render('forgetpass', { message3: req.flash('warning') });

        }

    } else {

        req.flash('warning', 'Please Enter Contact!');
        res.render('forgetpass', { message3: req.flash('warning') });
     
    }

}

const checklogin = async (req, res) => {

    let data = await model.findOne({ email: req.body.email });

    if (req.body.email != '' && req.body.password != '') {

        if (data) {

            const isPasswordValid = await bcrypt.compare(req.body.password, data.password);

            if (!isPasswordValid) {
                req.flash('danger', 'Email and Password is Incorrect!');
                res.render('login', { message: req.flash('danger') });
            } else {
                res.cookie("UserName", data.name);
                localStorage.setItem('userToken', JSON.stringify(data.token));

                res.render('index', { message: '', username: data.name });
            }

        }

    } else {

        req.flash('danger', 'Please Enter All the Fields!');
        res.render('login', { message: req.flash('danger') });

    }

}

const form = async (req, res) => {

    const { name, password, email, number } = req.body;

    const checkuser = await model.findOne({ email });

    if (email && password && name && number) {

        if (checkuser) {
            req.flash('info', 'Email is already registered!');
            res.render('signup', { message2: req.flash('info') });
        } else {

            const crypted = await bcrypt.hash(password, saltRounds);
            let data = new model({

                id: 1,
                name: name,
                number: number,
                email: email,
                password: crypted,
                token:''

            })

            const mailInfo = {

                from: "vishalchavda7781@gmail.com",
                to: email,
                subject: "Vishal Chavda Admin Panel",
                text: "Registration",
                html: "<p>You are successfully registered </p>"

            }

            await transporter.sendMail(mailInfo)

            await data.save();
            //JWT token generate
            var token = jwt.sign({data:data},secretKey);
            let _id = data._id;
            const result = await model.findByIdAndUpdate({_id},{$set:{token:token}})
            res.redirect('/admin');

        }

    } else {

        req.flash('info', 'Please Enter All the Fields!');
        res.render('signup', { message2: req.flash('info') });

    }

}

module.exports = {
    main, form, formdata, login, signup, checklogin, logout, forgetpass, otp, resetpass, savepass
}
