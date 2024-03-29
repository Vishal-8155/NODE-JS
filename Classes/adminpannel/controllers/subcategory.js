const express = require('express');
const submodel = require('../models/subCategoryModel');
const model = require('../models/categoryModel');

const app = express();
// const bodyParser = require('body-parser');
app.use(express.json());
const categoryData =async (req,res)=>{
    const getAllCat = await model.find();
    console.log(getAllCat);

    res.render('category',{
                    username: req.cookies.UserName,
                    getAllCat: getAllCat,
                    message2:'',
                    editSubCat:''
            });
} 
const savesubcat = async (req,res)=>{
    let getAllCat = await submodel.find();
    const name = req.body.name;
    const id = req.body.cat_id;
    const checkName = await submodel.findOne({name:name})
    
    // if(checkName){  
    //     res.status(300).send("Subcategory already exists")      
            // req.flash('success', 'Subategory already exists');
            // res.render('category',{
            //     username: req.cookies.UserName,
            //     getAllCat: getAllCat,
            //     message2: req.flash('success'),
            //     editSubCat:''
            // });
    //} else {

        const result = {
            cat_id: id,
            name: name
        }
        console.log("isd is "+id);
        console.log("name is "+name);
        const savedata = new submodel(result);
        await savedata.save();
        
        getAllCat = await submodel.find();
        res.redirect("/admin/allSubCategory")
        // req.flash('success', 'Category added successfully');
        // res.render('category',{
        //     username: req.cookies.UserName,
        //     getAllCat: getAllCat,
        //     message2: req.flash('success'),
        //     editSubCat:''
        // }); 
   // }
    

}
const updatesubcat = async (req,res)=>{
    let getAllCat = await submodel.find();
    const name = req.body.name;
    const id = req.body.cat_id;
    const subid = req.params.id;
    const result = await submodel.findByIdAndUpdate({_id:subid},{
        $set:{
            name:name,
            cat_id:id
        }
    })
    console.log("Subcat updated");
    res.redirect('/admin/allSubCategory');
    
}
const allSubCat = async(req,res) => {
    let catData = await model.find();
   let subData =  await submodel.find().populate("cat_id");
   console.log(subData);
   res.render('subcategory',{
                    username: req.cookies.UserName,
                    allSubCat: subData,
                    message2:'',
                    editSubCat:'',
                    catData: catData
   });
}
const getCatData = async(req,res) => {
    let cat_id = req.query.selectedValue;
    let subData;
    if(cat_id != '') {
        subData =  await submodel.find({cat_id:cat_id}).populate("cat_id");
    }
    else {
        subData =  await submodel.find().populate("cat_id");
    }
        res.json(subData);

//    res.render('subcategory',{
//                     username: req.cookies.UserName,
//                     allSubCat: subData,
//                     message2:'',
//                     editSubCat:'',
//                     catData: catData
//    });
}
const getFilterData = async(req,res) => {
    let searchtext = req.query.selectedValue;
    console.log(searchtext);
    let subData;
    const categories = await model.find({
        catname: { $regex: new RegExp(searchtext, "i") } 
    });
    
      
      let subcategories = await submodel.find({
        
        cat_id: { $in: categories.map(category => category._id) }
      }).populate("cat_id");
      console.log(subcategories);
    
    if(subcategories == ''){
        subcategories = await submodel.find({ name:{ $regex: new RegExp(searchtext, "i")}}).populate("cat_id")
    }
    res.json(subcategories);

}
const editSubCat = async(req,res) => {
    const id = req.params.id;
    let catData = await model.find();
    let subData =  await submodel.find().populate("cat_id");
    result = await submodel.findOne({_id:id})
    res.render('subcategory',{
        username: req.cookies.UserName,
        allSubCat: subData,
        message2:'',
        editSubCat:result,
        catData: catData
});
    
}
const deleteSubCat = async(req,res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    const result = await submodel.findByIdAndRemove({_id:id});
    res.redirect('/admin/allSubCategory');
}

module.exports = {savesubcat,allSubCat,deleteSubCat,editSubCat,updatesubcat,getCatData,getFilterData};