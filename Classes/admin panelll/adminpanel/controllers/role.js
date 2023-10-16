const roleModel = require('../models/rolemodel')
const express = require('express');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const app = express();

const getdata = async (req, res) => {
    const role_data = await roleModel.find();
    res.render('role', {
        username: req.cookies.UserName,
        userimage: req.cookies.image,
        message: '',
        role_edit:'',
        selected: '',
        AllRoleData: role_data,
    })
}

const getroledata = async (req, res) => {
    const rolename = req.body.rolename;
    const checkrole = await roleModel.findOne({ rolename: rolename });
    if (checkrole) {
        req.flash('msg_category', 'Role already exists');
        req.flash('msg_class', 'alert-success');
        res.redirect("/allroledata");
    } else {

        const role = {
            rolename: rolename
        }
        const savedata = new roleModel(role);
        await savedata.save();
        req.flash('msg_category', 'Role inserted successfully');
        req.flash('msg_class', 'alert-success');
        res.redirect("/allroledata");
    }
}

const allroledata = async (req, res) => {
    const role_data = await roleModel.find();
    res.render('role', {
        username: req.cookies.UserName,
        AllRoleData: role_data,
        userimage: req.cookies.image,
        selected: 'subcat',
        role_edit: '',
        message: req.flash('msg_category'),
        message_class: req.flash('msg_class'),
    })
}

const roledatadelete = async (req, res) => {
    const id = req.params.id;
    const data = await roleModel.findByIdAndRemove({ _id: id });
    req.flash('msg_category', 'Role deleted successfully');
    req.flash('msg_class', 'alert-success');
    res.redirect("/allroledata");
}

const roledataedit = async (req, res) => {
    const id = req.params.id;
    let roledata = await roleModel.find()
    result = await roleModel.findOne({ _id: id });
    res.render('role', {
        username: req.cookies.UserName,
        AllRoleData: roledata,
        userimage: req.cookies.image,
        selected: '',
        role_edit: result,
        message: ''
    });
}

const roleupdate = async (req, res) => {
    const rolename = req.body.rolename;
    const id = req.params.id
    const result = await roleModel.findByIdAndUpdate({ _id: id }, {
        $set: {
            rolename: rolename,
        }
    })
    req.flash('msg_category', 'Role updated successfully');
    req.flash('msg_class', 'alert-success');
    res.redirect("/allroledata");
}

const checkRole = async (req, res,next)=>{
    let role = JSON.parse(localStorage.getItem('userRole'));
    if(role=="Admin"){
        next();
    } else {
        res.redirect('/admin');
    }
}

module.exports = {
    getroledata,
    getdata,
    allroledata,
    roledatadelete,
    roledataedit,
    roleupdate,
    checkRole
};