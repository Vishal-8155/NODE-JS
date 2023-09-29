const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const body = bodyParser.urlencoded({ extended: true })

const routes = express.Router();

const {form,validate,edituser,deletedata} = require('../controller/user');

routes.get('/form',form);
routes.post('/validate',body,validate);
routes.get('/form/edituser/:id',edituser);
routes.get('/form/deleteuser/:id',deletedata);

module.exports = routes;