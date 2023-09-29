const express = require('express');
const passport = require('passport')

const app = express();
const routes = new express.Router();

const bodyParser = require('body-parser');

const body = bodyParser.urlencoded({ extended: true })

const { main, form, formdata, login, signup, checklogin, logout, forgetpass, otp, resetpass, savepass } = require('../controllers/user');
const { savecat, delcat, showcat, editcat } = require('../controllers/catcontroller')

routes.get('/admin', login);
routes.get('/admin/home', main);
routes.get('/admin/form', formdata);
routes.get('/admin/forgetpass', forgetpass);
routes.post('/admin/data', body, form);
routes.get('/admin/signup', signup);
routes.get('/admin/logout', logout);
routes.post('/admin/checklogin', body, checklogin);
routes.post('/admin/otp', body, otp);
routes.post('/admin/reset', body, resetpass);
routes.post('/admin/savepass', body, savepass);
routes.post('/savecat', body, savecat);
routes.get('/delcat/:id', delcat);
routes.get('/editcat/:id', showcat);
routes.post('/edittcat/:id', body, editcat);

// routes.post(
//     "/checklogin",
//     passport.authenticate("local", {
//       successRedirect: "/admin/home",
//       failureRedirect: "/test",
//     }),
//      async (req, res) => {
//       console.log(req.body)
//       res.send("done");
//     }
//   );    

module.exports = routes;


