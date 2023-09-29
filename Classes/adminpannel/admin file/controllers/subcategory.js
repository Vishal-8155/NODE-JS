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
    // let len = getAllCat.length+1;
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
        // res.status(200).send("Subcategory saved successfully")
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
    // let len = getAllCat.length+1;
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
    
//    console.log(subData);
//    res.render('subcategory',{
//                     username: req.cookies.UserName,
//                     allSubCat: subData,
//                     message2:'',
//                     editSubCat:'',
//                     catData: catData
//    });
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
    //delete from tbl_name where id=10
    //select firstname,lastname from tbl;    
}

module.exports = {savesubcat,allSubCat,deleteSubCat,editSubCat,updatesubcat,getCatData};