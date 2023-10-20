const model = require('../models/registermodels');
const rolemodel = require('../models/rolemodel');
// const sendinBlue = require('sib-api-v3-sdk');
const express = require('express');
const nodemailer = require('nodemailer')
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
const savedata = async (req, res) => {

    const { name, email, role_id, googleId } = req.body;
    console.log(req.body)

    const checkuserrole = await model.findOne({ role_id }).populate('role_id');

    let roleData = await rolemodel.find({});

    if (email && name && role_id) {
        if (checkuserrole) {
            if (checkuserrole.role_id.rolename == 'Admin') {
                req.flash('info', 'Admin is already registered!');
                res.render('register', { message: req.flash('info'), roledata: roleData });
            } else if (checkuserrole.role_id.rolename == 'Manager') {
                const checkmanager = await model.find({ role_id });
                if (checkmanager.length == 2) {
                    req.flash('info', 'Two Managers already registered!');
                    res.render('register', { message: req.flash('info'), roledata: roleData });
                } else {
                    email = { $regex: new RegExp(email, "i") }
                    let data = await model.findOneAndUpdate({ googleId }, {
                        $set: {
                            name: name,
                            email: email,
                            role_id: role_id
                        }
                    });

                    // let data = new model({
                    //     name: name,
                    //     number: number,
                    //     email: email,
                    //     role_id: role_id
                    // })

                    const mailInfo = {

                        from: "vishalchavda7781@gmail.com",
                        to: email,
                        subject: "Vishal Chavda Admin Panel",
                        text: "Registration",
                        html: "<p>You are successfully registered </p>"

                    }

                    // await transporter.sendMail(mailInfo)

                    //JWT token generate
                    var token = jwt.sign({ data: data }, secretKey);
                    let _id = data._id;
                    const result = await model.findByIdAndUpdate({ _id }, { $set: { token: token } })
                    let rolename = checkuserrole.role_id.rolename;
                    console.log(rolename);
                    localStorage.setItem('userRole', JSON.stringify(rolename));

                    res.redirect('/admin/home');
                }

            }
            else if (checkuser) {
                req.flash('info', 'Email is already registered!');
                res.render('register', { message: req.flash('info'), roledata: roleData });
            }
        }
        else {
            let data = await model.findOneAndUpdate({ googleId }, {
                $set: {
                    name: name,
                    email: email,
                    role_id: role_id
                }
            });

            const mailInfo = {

                from: "vishalchavda7781@gmail.com",
                to: email,
                subject: "Vishal Chavda Admin Panel",
                text: "Registration",
                html: "<p>You are successfully registered </p>"

            }

            // await transporter.sendMail(mailInfo)

            // await data.save();

            res.redirect('/admin/home');

        }

    } else {

        req.flash('info', 'Please Enter All the Fields!');
        res.render('signup', { message2: req.flash('info'), roleData: roleData });

    }

}

const loginDetails = (req, res) => {
    res.render('loginDetails', {

    });
}

module.exports = { loginDetails, savedata }