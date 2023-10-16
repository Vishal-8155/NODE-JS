let registerModel = require('../models/registermodels');
let tokenModel = require('../models/tokenmodels');
let roleModel = require('../models/rolemodel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secret_key = "secret1234";
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

//Encrypting text
const encrypt_text = async (plainText, password) => {
    try {
        const iv = crypto.randomBytes(16);
        const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        let encrypted = cipher.update(plainText);
        encrypted = Buffer.concat([encrypted, cipher.final()])
        return iv.toString('hex') + ':' + encrypted.toString('hex');

    } catch (error) {
        console.log(error);
    }
}
// Decrypting text
const decrypt_text = async (encryptedText, password) => {
    try {
        const textParts = encryptedText.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');

        const encryptedData = Buffer.from(textParts.join(':'), 'hex');
        const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

        const decrypted = decipher.update(encryptedData);
        const decryptedText = Buffer.concat([decrypted, decipher.final()]);
        return decryptedText.toString();
    } catch (error) {
        console.log(error)
    }
}

const checkUser = async (req, res) => {
    if (req.cookies) {
        if (req.cookies.UserName === undefined || req.cookies.UserName === 'undefined') {
            res.clearCookie('UserName');
            res.redirect('/');
            return false;
        }
        return true;
    }
}

const dataUser = async (req, res) => {
    if (req.cookies && req.cookies.UserName != 'admin') {
        return res.redirect('/');
    }
};

const getDashboard = async (req, res) => {

    var a = await checkUser(req, res);
    if (a === true) {
        res.render('index', { username: req.cookies.UserName, userimage: req.cookies.image, selected: 'admin' });
    } else {
        res.render('index', { username: req.cookies.UserName, userimage: req.cookies.image, selected: 'admin' })
    }
};



const gettable = async (req, res) => {
    await checkUser(req, res)
    res.render('producttable', { username: req.cookies.UserName, userimage: req.cookies.image, selected: 'producttable' });
}

const transpoter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "vishalchavda7781@gmail.com",
        pass: 'tblatzxzeggquxhn',
    },
    secure: true,
});

const getregister = async (req, res) => {
    const roledata = await roleModel.find({});
    res.render('register', {
        roledata: roledata,
        username: req.cookies.UserName,
        useremail: req.cookies.Useremail,
        userimage: req.cookies.image,
        selected: 'register',
        message: req.flash('msg_category'),
        message_class: req.flash('msg_class'),
    })
}

const register = async (req, res) => {
    const roledata = await roleModel.find({});
    res.render('register', {
        roledata: roledata,
        username: req.cookies.UserName,
        useremail: req.cookies.Useremail,
        userimage: req.cookies.image,
        selected: 'register',
        message: '',
        message_class: req.flash('msg_class'),
    })
}

const registerdata = async (req, res) => {

    // let isAllowToCreate = true;
    const { username, password, email, role_id } = req.body;
    const chackdata = await registerModel.findOne({ email });
    const adminRoleId = await registerModel.findOne({ role_id }).populate('role_id');
    if (username, password, email, role_id) {
        if (adminRoleId) {
            if (adminRoleId.role_id.rolename == 'Admin') {
                req.flash('msg_category', 'Admin already exists');
                req.flash('msg_class', 'alert-success');
                res.redirect("/getregister");
            } else if (adminRoleId.role_id.rolename == 'Manager') {
                const checkManagerRoleUser = await registerModel.find({ role_id });
                if (checkManagerRoleUser.length == 2) {
                    req.flash('msg_category', 'Two Managers already exists');
                    req.flash('msg_class', 'alert-danger');
                    res.redirect("/getregister");
                } else {
                    const crypted = await bcrypt.hash(password, saltRounds)
                    const res2 = new registerModel({
                        id: 1,
                        email: email,
                        password: crypted,
                        username: username,
                        token: '',
                        role_id: role_id,
                        roledata: '',
                    });
                    const mailInfo = {
                        from: "vishalchavda7781@gmail.com",
                        to: email,
                        subject: "Admin Panel",
                        text: "Registration",
                        html: "<a>click here register"
                    }
                    await transpoter.sendMail(mailInfo);

                    await res2.save();

                    var token = jwt.sign({ res2: res2 }, secret_key)
                    console.log("generated token");
                    console.log(token);
                    let _id = res2._id;
                    console.log(_id);
                    const result = await registerModel.findByIdAndUpdate({ _id }, { $set: { token: token } })
                    console.log(result);
                    res.redirect('/login');

                }

            } else if (chackdata) {
                req.flash('msg_category', 'This Email Id already exists');
                req.flash('msg_class', 'alert-danger');
            }

        } else {
            const crypted = await bcrypt.hash(password, saltRounds)
            const res2 = new registerModel({
                id: 1,
                email: email,
                password: crypted,
                username: username,
                token: '',
                role_id: role_id,
                roledata: '',
            });
            const mailInfo = {
                from: "vishalchavda7781@gmail.com",
                to: email,
                subject: "Admin Panel",
                text: "Registration",
                html: "<a>click here register"
            }
            // await transpoter.sendMail(mailInfo);

            await res2.save();

            var token = jwt.sign({ res2: res2 }, secret_key)
            console.log("generated token");
            console.log(token);
            let _id = res2._id;
            console.log(_id);
            const result = await registerModel.findByIdAndUpdate({ _id }, { $set: { token: token } })
            console.log(result);
            res.redirect('/login');

        }

    } else {

        req.flash('msg_category', 'Please Enter All Fields');
        req.flash('msg_class', 'alert-success');

    }

}

const checkUserData = async (req, res) => {
    const dataUser = await registerModel.findOne({ email: req.body.email, password: req.body.password });
    const roledata = await roleModel.find({});
    if (dataUser) {
        res.cookie('UserName', dataUser.username);
        res.redirect('/admin');
    } else {
        req.flash('danger', 'Email or password wrong !!!');
        res.render('login', { message: req.flash('danger'), message_class: 'alert-danger', roledata: roledata });
    }
}

const checkLogindata = async (req, res) => {
    let userdata = await registerModel.findOne({ email: req.body.email }).populate('role_id');
    const roledata = await roleModel.find({});

    if (req.body.email != '' && req.body.password != '') {
        if (!userdata) {
            req.flash('emsg_token', 'User not found');
            emsg_token = req.flash('emsg_token');
            res.render("login", { message: emsg_token, message_class: 'alert-danger', roledata: roledata });
        } else {

            const isPasswordValid = await bcrypt.compare(req.body.password, userdata.password);

            if (!isPasswordValid) {
                req.flash('emsg_token', 'Invalid password');
                emsg_token = req.flash('emsg_token');
                res.render("login", { message: emsg_token, message_class: 'alert-danger', roledata: roledata });
            } else {


                res.cookie('UserName', userdata.username);
                res.cookie('Useremail', userdata.email);

                let rolename = userdata.role_id.rolename;
                console.log(rolename)
                localStorage.setItem('userToken', JSON.stringify(userdata.token));
                localStorage.setItem('userRole', JSON.stringify(rolename));

                res.redirect('/admin');
            }
        }

    } else {

        req.flash('emsg_token', 'Please Enter All Fields');
        emsg_token = req.flash('emsg_token');
        res.render("login", { message: emsg_token, message_class: 'alert-danger', roledata: roledata });

    }

}

function createOtp() {
    var min = 100000;
    var max = 999999;
    otp = Math.floor(Math.random() * (max - min)) + min;
    return otp;
}

const sendOtp = async (req, res) => {
    email = req.body.email;
    const roledata = await roleModel.find({});
    let getdata = await registerModel.findOne({ email: req.body.email })
    if (!getdata) {
        req.flash('emsg_token', 'User not found');
        emsg_token = req.flash('emsg_token');
        res.render("forget", { message: emsg_token, message_class: 'alert-danger', roledata: roledata });
    } else {
        otp = createOtp();
        try {
            let tok_exists = await tokenModel.findOne({ email: email })
            if (tok_exists) {
                let del_tok = await tokenModel.deleteMany({ email: email });
                console.log(del_tok);
            }
            const result = new tokenModel({
                email: email,
                otp: otp
            });
            const res1 = await result.save()
            console.log("data saved" + res1);
        } catch (e) {
            console.log(e);
        }
        const transporter = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: "makwanajaydip1510@gmail.com",
                pass: 'iovdaxolhzltlptu',
            },
            secure: true,
        });
        const crypted = await encrypt_text(email, secret_key);

        var href = `http://localhost:8004/resetcred?token=${crypted}`;
        const mailInfo = {
            from: "vishalchavda7781@gmail.com",
            to: email,
            subject: `Reset password Admin panel`,
            html: `<p>your OTP is ${otp} <a href="${href}">Reset Password</a></p>`
        }
        await transporter.sendMail(mailInfo)
        req.flash('smsg_forget', 'Password reset link has been shared to your registerd email address, please check your email account.');
        res.render('forget', { message: req.flash('smsg_forget'), message_class: 'alert-success', roledata: roledata });
    }

}

const vaildtoken = async (req, res) => {
    var emsg_token = '';
    const roledata = await roleModel.find({});
    console.log(req.query.token);
    if (req.query.token) {
        var token = req.query.token.toString();
        const dcrypted = await decrypt_text(token, secret_key);
        console.log(dcrypted);
        if (!dcrypted) {
            req.flash('emsg_token', 'Invaild token');
            emsg_token = req.flash('emsg_token');
        }
        res.render('resetpassword', { email: dcrypted, message: emsg_token, roledata: roledata });
    } else {
        console.log("body is:-");
        console.log(req.body.email);
        console.log(req.body.otp);
        console.log(req.body.password);
        console.log(req.body.cpassword);
        // step 1
        let tok_exists = await tokenModel.findOne({ email: req.body.email })
        if (tok_exists) {
            console.log(tok_exists);
            if (req.body.otp == tok_exists.otp) {
                let del_tok = await tokenModel.deleteMany({ email: req.body.email });
                console.log(del_tok);
                // step 2 
                let getdata = await registerModel.findOne({ email: req.body.email })
                if (!getdata) {
                    req.flash('emsg_token', 'user not found');
                    emsg_token = req.flash('emsg_token');
                    res.render('resetpassword', { message: emsg_token, message_class: 'alert-danger', roledata: roledata });
                } else {
                    const hash_pwd = await bcrypt.hash(req.body.password, saltRounds)
                    const updata = await registerModel.updateOne({ email: email }, { $set: { password: hash_pwd } });
                    req.flash('emsg_token', 'Password sucessfully reset, kindy use new password to login.');
                    emsg_token = req.flash('emsg_token');
                    res.render('login', { message: emsg_token, message_class: 'alert-success', roledata: roledata });
                }
            } else {
                req.flash('emsg_token', 'OTP not matched, please check your email or reprocess again.');
                emsg_token = req.flash('emsg_token');
                res.render('resetpassword', { message: emsg_token, message_class: 'alert-danger', roledata: roledata });
            }

        } else {
            req.flash('emsg_token', 'Invalid token');
            emsg_token = req.flash('emsg_token');
            res.render('resetpassword', { message: emsg_token, message_class: 'alert-danger', roledata: roledata });
        }


    }
}

module.exports = {
    getDashboard,
    gettable,
    checkUserData,
    registerdata,
    dataUser,
    register,
    getregister,
    checkLogindata,
    sendOtp,
    vaildtoken
}