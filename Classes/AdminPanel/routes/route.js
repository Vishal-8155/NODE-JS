const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const body = bodyParser.urlencoded({ extended: true })

const routes = express.Router();

const {main,form,formdata,login,signup,checklogin,logout} = require('../controllers/user');


routes.get('/admin',login);
routes.get('/admin/home',main);
routes.get('/admin/form',formdata);
routes.post('/admin/data',body,form);
routes.get('/admin/signup',signup);
routes.get('/admin/logout',logout);
routes.post('/admin/checklogin',body,checklogin);

module.exports = routes;