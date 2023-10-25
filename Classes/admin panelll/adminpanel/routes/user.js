const express = require('express');
const body = require('body-parser');
const rolemodel = require('../models/rolemodel');
const bodyParser = body.urlencoded({ extended: false });
const mongoose = require('mongoose');
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const maindata =  async ()=>{
    const url = "mongodb://127.0.0.1:27017/adminpanel";
    await mongoose.connect(url);
    console.log('established connection');  
}
maindata();
const passport = require('passport');
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
let imgfilename = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(req.url == '/profile/data')
        {
            return cb(null, "./upload/");
        }else if(req.url == '/allproductdata' || req.route.path == '/updateproductdata/:id')
        {
            return cb(null, "./product/");
        }
        
    },
    filename: function (req, file, cb) {
        imgfilename = Date.now() + file.originalname;
        return cb(null, imgfilename);
    }
});
const upload = multer({ storage: storage });

const { getDashboard, registerdata,checkLogindata,sendOtp,vaildtoken,register,getregister} = require("../controllers/user");

const {getcategorydata,categorydisplay,categorydelete,categoryedit,api_category,api_categorydisplay,api_categorydelete} = require("../controllers/category");

const {subcategorydata, SubCatData, subcatdelete, subcatedit, updatesubcat, getCatdata, getsearching} = require("../controllers/subcategory");

const verifyToken = require('../models/jwtconfing');

const {productdata,allproductdata,productDisplay,productDelete,productEdit,ajax_productdetail,productImageDelete} = require("../controllers/product");

const {getroledata,getdata,allroledata,checkRole,roledatadelete,roledataedit,roleupdate} = require("../controllers/role");

router.get('/forgetpassword',(req,res)=>{
  res.render('forget',{ message:''});
})

router.get('/resetcred',vaildtoken);
router.post('/resetcred',bodyParser,vaildtoken);
router.post('/forgetotp',bodyParser,sendOtp);

router.get('/admin', getDashboard);
 
router.get('/category',verifyToken,categorydisplay);
router.get('/catdelete/:uniqe_id',categorydelete);
router.get('/catedit',categoryedit);
router.post('/category/createsavedata', bodyParser, getcategorydata);
router.post('/category/editsavedata/:unique_id',verifyToken, bodyParser, getcategorydata);

router.post('/subcategory/savedata',bodyParser,subcategorydata);
router.get('/subcategory/alldata', verifyToken,SubCatData);
router.get('/subcat/deletedata/:id',subcatdelete);
router.get('/subcategortedit/:id',subcatedit);
router.post('/updatesubcategory/:id',bodyParser,updatesubcat);

router.get('/getalldata',getCatdata);
router.get('/filteralldata',getsearching);
router.get('/ajax_productdetail',ajax_productdetail)

router.get('/product',productdata)
router.post("/allproductdata",upload.array('image'),bodyParser,allproductdata)
router.post("/updateproductdata/:id",upload.array('image'),bodyParser,allproductdata)
router.get('/productDisplay',productDisplay)
router.get('/productDelete/:id',productDelete)
router.get('/productEdit/:id',productEdit);
router.get('/productImageDelete/:id/:image_idx',productImageDelete);

router.post('/categorydata',bodyParser,api_category);
router.get('/apicategorydisplay',api_categorydisplay);
router.delete('/apicategorydelete/:id',api_categorydelete);

router.get('/register',register);
router.get('/getregister',getregister);
router.post('/register', bodyParser, registerdata);

router.post("/login",bodyParser,checkLogindata);

router.post('/roledata',checkRole,getroledata);
router.get('/rolealldata',checkRole,getdata);
router.get('/allroledata',checkRole,allroledata);
router.get('/roledatadelete/:id',checkRole,roledatadelete);
router.get('/roledataedit/:id',checkRole,roledataedit);
router.post('/roleupdate/:id',checkRole,bodyParser,roleupdate);

//Google routes
router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { 
        // successRedirect:'/admin/home',
        failureRedirect: '/'
   }),async (req,res)=>{
    let roleData1 = await rolemodel.find({isActive:1})
      console.log(req.user.profile)
      if(req.user.created){
          res.render('logindetails',{
            user:req.user.profile,
            roleData:roleData1,
            message2:"You have been registered successfully."
          });
      } else {
          res.redirect('/admin');
      }
   });

module.exports = router;

// 843629882441-sq995b7pbi0i9443nstfrn25at3bu3m6.apps.googleusercontent.com

// secret = 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

// client id = 843629882441-sq995b7pbi0i9443nstfrn25at3bu3m6.apps.googleusercontent.com