const model = require('../models/mongoosedb');

const rs = (req, res) => {
    if (req.cookies && req.cookies.UserName != "VISHAL") {
        return res.redirect('/admin');
    }
}

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

const logout = (req, res) => {

    res.clearCookie('UserName');
    res.redirect('/admin');

}

const signup = (req, res) => {

    res.render('signup', { message2: '' });

}

const checklogin = async (req, res) => {

    let data = await model.findOne({ email: req.body.email, password: req.body.password });

    if (req.body.email != '' && req.body.password != '') {

        if (data) {

            res.cookie("UserName", data.name);
            res.redirect('/admin/home');

        } else {

            req.flash('danger', 'Email and Password is Incorrect!');
            res.render('login', { message: req.flash('danger') });

        }

    } else {

        req.flash('danger', 'Please Enter All the Fields!');
        res.render('login', { message: req.flash('danger') });

    }

}

const form = async (req, res) => {

    const checkuser = await model.findOne({ email: req.body.email });

    if (req.body.email  && req.body.password  && req.body.name){

        if (checkuser) {

            req.flash('info', 'Email is already registered!');
            res.render('signup', { message2: req.flash('info') });


        } else {

            let data = new model({

                id: 1,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password

            })

            await data.save();
            res.redirect('/admin');

        }
    } else {
        req.flash('info', 'Please Enter All the Fields!');
        res.render('signup', { message2: req.flash('info') });
    }

}



module.exports = {

    main, form, formdata, login, signup, checklogin, logout

}
