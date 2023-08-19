const model = require('../models/mongoosedb');

const rs = (req, res)=>{
    if(req.cookies && req.cookies.UserName != "VISHAL"){
        return res.redirect('/admin');
    }
}

const main = (req, res) => {

    rs(req,res);
    res.render('index',{
        username: req.cookies.UserName
    });

}

const formdata = (req, res) => {

    rs(req,res);
    res.render('form');

}

const login = (req, res) => {

    res.render('login',{message: ''});

}

const signup = (req, res) => {

    res.render('signup');

}

const logout = (req, res) => {

    res.clearCookie('UserName');
    res.redirect('/admin');

}

const form = async (req, res) => {

    const checkuser = model.findOne({ email: req.body.email });


    if (checkuser.email) {

        res.send('Email is already registered')

    } else {

        let data = new model({

            id: 1,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        })
                    
        await data.save();
        res.render('login');

    }

}

const checklogin = async (req, res) => {

    let data = await model.findOne({email:req.body.email,password:req.body.password});

    if (data) {

        res.cookie("UserName",data.name);
        res.redirect('/admin/home');

    } else {

        req.flash('danger','Email and Password is Incorrect!');
        res.render('login',{message: req.flash('danger')});

    }

}

module.exports = {

    main, form, formdata, login, signup, checklogin, logout

}
