const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const body = bodyParser.urlencoded({ extended: true })

const routes = express.Router();

const {main,form,formdata,login,signup,checklogin,logout,forgetpass,otp,resetpass,savepass} = require('../controllers/user');
const {categoryData,savecat,deleteCatData,editCatData,updatecat} = require('../controllers/category');
const {savesubcat,allSubCat,deleteSubCat,editSubCat,updatesubcat,getCatData} = require('../controllers/subcategory');

routes.get('/admin',login);

routes.get('/admin/home',main);
routes.get('/admin/form',formdata);
routes.get('/admin/category',categoryData);
routes.post('/admin/savecategory',body,savecat)
routes.post('/admin/savesubcategory',body,savesubcat)

routes.get('/admin/allSubCategory',allSubCat);
routes.get('/admin/deleteSubCat/:id',deleteSubCat);
routes.get('/admin/editSubCat/:id',editSubCat);
routes.post('/admin/updatesubcategory/:id',body,updatesubcat)


routes.post('/admin/updatecategory/:id',body,updatecat)
routes.get('/admin/deletecat/:id',deleteCatData);
routes.get('/admin/editcat/:id',editCatData);

routes.get('/admin/forgetpass',forgetpass);
routes.post('/admin/data',body,form);
routes.get('/admin/signup',signup);
routes.get('/admin/logout',logout);
routes.post('/admin/checklogin',body,checklogin);
routes.post('/admin/otp',body,otp);
routes.post('/admin/reset',body,resetpass);
routes.post('/admin/savepass',body,savepass);

routes.get('/getData',getCatData);
//  (req, res) => {
    // const selectedValue = req.query.selectedValue;
    // You can perform any data retrieval or processing here
    // For demonstration purposes, we'll just send back the selected value
    // res.json(`Data for ${selectedValue}`);
//   });

module.exports = routes;