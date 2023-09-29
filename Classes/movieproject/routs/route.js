const express = require('express');
const body = require('body-parser');
const routes = express.Router();
const multer = require('multer');
const model = require('../models/model');
const fs = require('fs')
const bs = body.urlencoded({ extended: true });

let imgname = '';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        imgname = Date.now() + file.originalname;
        return cb(null, imgname);
    }
});
const upload = multer({ storage: storage });
console.log(imgname);
const { data, deldata, aditdata } = require("../controllers/controller");
routes.get('/crud', data);
routes.get('/del/:id', deldata);
routes.get('/edit/:id', aditdata);
routes.post('/savedata', upload.single('image'), async (req, res) => {

    let id = req.body.hid;
    let name = req.body.name;

    if (id != '') {

        

        user = await model.find();

        old = (user.image != '') ? user.image : '';

        if (req.file && imgname != '') {
            let img1 = "uploads/" + user.image;

            fs.unlink(img1, () => {
                console.log("delete");
            });
        }

        await model.findOneAndUpdate({ _id: id },
            {
                $set: {
                    id: (user.length) + 1,
                    moviename: req.body.name,
                    date: req.body.date,
                    charactor: req.body.charactor,
                    pimage: (req.file && imgname != '') ? imgname : old
                }

            });

    } else {

        if (name != '') {

            let data = new model({

                id: 1,
                moviename: req.body.name,
                date: req.body.date,
                charactor: req.body.charactor,
                pimage: imgname

            })

            let b = await data.save();

        }

    }

    userdata2 = '';
    res.redirect('/crud');

});



module.exports = routes;