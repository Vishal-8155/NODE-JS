let userModel = require("../model/userModel");
let bcrypt = require("bcrypt");
const saltRounds = 10;
let nodemailer = require("nodemailer");

const passwordHash = (password) => {
    return bcrypt.hash(password, saltRounds)
}

const trans = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "kothiyakuntesh99@gmail.com",
        pass: "ogltavbnkysgztkx",
    },
    secure: true,
});

const restrict = (req, res) => {
    if (req.cookies && req.cookies.Username != "Kuntesh") {
        return res.redirect("/");
    }
};

const getDash = async (req, res) => {
    await restrict(req, res);
    res.render("index", { usNames: req.cookies.Username });
};

const getForm = async (req, res) => {
    await restrict(req, res);
    res.render("form", { usNames: req.cookies.Username });
};

const login = (req, res) => {
    res.render("login", { message: "" });
};

const logout = (req, res) => {
    res.clearCookie("Username");
    res.redirect("/");
};

const register = async (req, res) => {
    res.render("register", { message2: "" });
};

const form = async (req, res) => {
    const userCheck = await userModel.findOne({ email: req.body.uEmail });
    if (req.body.uEmail && req.body.uPass && req.body.uName) {
        if (userCheck) {
            req.flash("info", "Email is already Registered");
            res.render("register", { message2: req.flash("info") });
        } else {
            const mailData = {
                from: "kothiyakuntesh99@gmail.com",
                to: req.body.uEmail,
                subject: "Admin Panel",
                text: "Registration Success",
                html: "<p>You are Successfully Registered.</p>",
            };
            let data = new userModel({
                id: 1,
                name: req.body.uName,
                email: req.body.uEmail,
                password: await passwordHash(req.body.uPass),
            });

            await trans.sendMail(mailData);
            await data.save();
            res.redirect("/");
        }
    } else {
        req.flash("info", "All fields are required");
        res.render("register", { message2: req.flash("info") });
    }
};

const cLog = async (req, res) => {

    const userCheck = await userModel.findOne({
        email: req.body.uEmail,
    });
    const password = await bcrypt.compare(req.body.uPass, userCheck.password);
    if (req.body.uEmail && password) {
        if (userCheck) {
            res.cookie("Username", userCheck.name);
            res.redirect("/admin/info");
        } else {
            req.flash("danger", "Email or Password is Incorrect");
            res.render("login", { message: req.flash("danger") });
        }
    } else {
        req.flash("danger", "All fields are required");
        res.render("login", { message: req.flash("danger") });
    }
};

const forgot1 = (req, res) => {
    res.render('forgotpwd', { message3: '' });
};

function makeOTP() {
    let min = 100000;
    let max = 999999;
    code = Math.floor(Math.random() * (max - min + 1)) + min;
    return code;
}

const getOTP = async (req, res) => {

    let usData = await userModel.findOne({ email: req.body.uEmail });
    code = makeOTP();
    console.log(req.body.uEmail);
    console.log(code);

    if (!usData) {
        req.flash("danger", "Email is not Registered");
        res.render("register", { message3: req.flash("danger"), message2: '' });
    } else {

        const trans = nodemailer.createTransport({
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: "kothiyakuntesh99@gmail.com",
                pass: "ogltavbnkysgztkx",
            },
            secure: true,
        });

        const mailData = {
            from: "kothiyakuntesh99@gmail.com",
            to: req.body.uEmail,
            subject: "Admin Panel",
            text: "Registration Success",
            html: `<p>Your OTP is ${code}</p>`,
        }
        await trans.sendMail(mailData);
    }
    // res.redirect('/admin/info')
};

module.exports = {
    getDash,
    getForm,
    form,
    cLog,
    login,
    logout,
    register,
    getOTP,
    forgot1
};

// kothiyakuntesh99 password: ogltavbnkysgztkx

// kothiyakunteshkumar password : pgruyhripkgbszjk

// crypto => is for bcrypt and decrypt