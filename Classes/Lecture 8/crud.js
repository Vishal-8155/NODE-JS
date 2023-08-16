const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const mongodb = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const database = "classes";
const client = new MongoClient(url);
const path = require("path");
var fs = require('fs');
const body = require("body-parser");
const multer = require("multer");

const bodyParse = body.urlencoded({ extended: false });
// extended false - string & array
// extended true - object & json format
app.set("view engine", "ejs");

const mainPath = path.join(__dirname, "../public");
app.use(express.static(mainPath));

app.use(express.static(__dirname + "/uploads"));
let image = '';

// let upload = multer({ dest: __dirname+"/uploads"})

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, __dirname + "/uploads");

  },
  filename: function (req, file, cb) {

    image = Date.now() + file.originalname
    return cb(null, image)

  }

});

const upload = multer({ storage: storage });

async function main() {
  try {

    let edtData = "";

    app.get("/saveGet", async (req, res) => {

      let result = await client.connect();
      let db = result.db(database);
      let collection = db.collection('users');
      let response = await collection.find({}).toArray();

      res.render("crud", {

        data: response,
        userEdit: edtData

      });

    });

    app.get("/user", (req, res) => {
      res.sendFile(mainPath + "/" + "form.html");
    });

    app.get("/del/:id", async (req, res) => {

      let result = await client.connect();
      let db = result.db(database);
      let collection = db.collection('users');

      id = req.params.id;

      let userdata = await collection.findOne({ _id: new mongodb.ObjectId(req.params.id) })

      imgname = __dirname + "/uploads/" + userdata.image;

      fs.unlink(imgname, () => {

        console.log("Image deleted successfully");

      })

      await collection.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });

      res.redirect('/saveGet');

    });

    app.post("/save", upload.single('image'), async (req, res) => {

      id = req.body.id;

      old = (image != '') ? image : '';

      if (id != '') {

        let result = await client.connect();
        let db = result.db(database);
        let collection = db.collection('users');

        if (image != '') {

          let userdata = await collection.findOne({ _id: new mongodb.ObjectId(id) })

          imgname = __dirname + "/uploads/" + userdata.image;

          fs.unlink(imgname, () => {

            console.log("Old Image deleted successfully");

          })

        }

        await collection.updateOne(

          { _id: new mongodb.ObjectId(id) },
          {
            $set:
            {
              name: req.body.name,
              age: req.body.age,
              mobile: req.body.mobile,
              image: (image != undefined) ? image : old
            }
          }
        )

        if (result.modifiedCount > 0) {
          console.log('data updated');
        }

      } else {

        let udata = {

          name: req.body.name,
          age: req.body.age,
          mobile: req.body.mobile,
          image: (image != undefined) ? image : old

        }

        let result = await client.connect();
        let db = result.db(database);
        let collection = db.collection('users');

        await collection.insertOne(udata);

      }

      edtData = "";
      res.redirect('/saveGet');

    });

    app.get('/edit/:id', bodyParse, async (req, res) => {
      let result = await client.connect();
      let db = result.db(database);
      let collection = db.collection('users');
      let response = await collection.find({}).toArray();

      id = req.params.id;

      edtData = response.find((i) => {

        return i._id == id;

      })

      res.render("crud", {

        data: response,
        userEdit: edtData

      });

    })



  }
  catch (err) {
    console.log(err);
  }
}

main();

app.listen(7000, "127.0.0.1", () => {

  console.log("Successfully started server");

});



