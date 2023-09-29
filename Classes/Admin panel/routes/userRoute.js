const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const bodyPs = bodyParser.urlencoded({ extended: false });
const router = express.Router();

const { categoryInfo, saveCategory, deleteCategory, editCategory, updateCategory } = require("../controller/Category");

const { getDash, getForm, form, cLog, login, logout, register, getOTP, forgot1 } = require("../controller/userContr");

const { saveSubCategory, AllSubCate, deleteSubCate, editSubCate, updateSubCate, abcAllData } = require("../controller/subCategory");

// router.get('/passwordforgot', (req, res) => {
//     res.render('forgotpwd')
// })

router.get('/passwordforgot', forgot1);
router.post('/OTP', bodyPs, getOTP);
router.get('/admin/info', getDash);
router.get('/admin/form', getForm);
router.get('/', login);
router.get('/register', register);
router.get('/logout', logout);
router.post('/saveData', bodyPs, form);
router.post('/checkLogin', bodyPs, cLog);
router.get('/admin/category', categoryInfo);
router.post('/saveCatData', bodyPs, saveCategory);
router.get('/delete/:id', deleteCategory);
router.get('/edit/:id', editCategory);
router.post('/updateCateData/:id', bodyPs, updateCategory);
router.post('/saveSubCategory', bodyPs, saveSubCategory);
router.get('/subCategoryAll',AllSubCate);
router.get('/deleteSubCategory/:id', deleteSubCate);
router.get('/editSubCategory/:id',editSubCate);
router.post('/updateSubCategory/:id', bodyPs, updateSubCate);
router.get('/abcdData',abcAllData);

module.exports = router;
