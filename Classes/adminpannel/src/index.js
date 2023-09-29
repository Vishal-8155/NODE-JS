const express = require('express')
const app = express();
const path = require('path')
const body = require('body-parser')
//extended false -string & array
//extended true -object & json format

app.set('view engine','ejs')
const bodyparse = body.urlencoded({extended:false})

const mainpath = path.join(__dirname, '../public')
app.use(express.static(mainpath))

app.get('/',(req,res)=>{
    res.write("<h1>Home page</h1>")
    res.write("<h1>My first Home page</h1>")
    res.send();
})
let edituser = '';
let userdata = [
    {
        id:1,
        name:"abc",
        email:"abc@mail.com",
        age:24
    },
    {
        id:2,
        name:"main",
        email:"main@mail.com",
        age:22
    },
    {
        id:3,
        name:"test",
        email:"test@mail.com",
        age:54
    },
    {
        id:4,
        name:"pqr",
        email:"pqr@mail.com",
        age:34
    },
    {
        id:5,
        name:"xyz",
        email:"abc@mail.com",
        age:24
    }
]
app.get('/myhome',(req,res)=>{
    res.render('user',{
        data:userdata,
        edituser:edituser
    })
})

//GET METHOD
app.get('/user',(req,res)=>{
    console.log(mainpath)
    res.sendFile(mainpath+'/'+'form.html')
})

app.get('/del/:id',(req,res)=>{
    let  id = req.params.id
    id = id-1
    userdata.splice(id,1)
    let j = 1;
    userdata.forEach((i)=>{
        i.id = j;
        j++;
    })
    // userdata.forEach((i)=>{
    //     if(i.id > id){
    //         i.id--
    //     }
    // })
    res.redirect('/myhome')

})

app.post('/savedata',bodyparse,(req,res)=>{
    id = req.body.id
    if(id != ''){
        //update
        userdata.forEach((i)=>{
            if(i.id == id){
                i.name = req.body.name
                i.email = req.body.email
                i.age = req.body.age
            }
        })
    } else {
        //push
        data = {
            id:userdata.length +1,
            name:req.body.name,
            email:req.body.email,
            age:req.body.age
        }
        userdata.push(data)
    }
    
    res.redirect('/myhome')

})

app.get('/edit/:id',(req,res)=>{
    let  id = req.params.id
     edituser = userdata.find((i)=>{
        return i.id == id
    })
console.log(edituser)
    res.render('user',{
        data:userdata,
        edituser:edituser
    })

})
app.listen(8080,"127.0.0.1",()=>{
    console.log("Server is running on port 8080")
});