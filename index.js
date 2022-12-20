require('./models/db')
const express=require('express')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const user=mongoose.model("IdealList")
const item=mongoose.model("ItemlList")
const session = require('express-session')
const cookieParser=require('cookie-parser');
const oneDay=1000 * 60 * 60 * 24
const app=express()
app.use(bodyparser.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(session({
    secret: 'mybook',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } 
  }))
app.get("/",(req,res)=>{
    res.render('index',{status:0})
})
app.post("/signin",(req,res)=>{
    var query ={ uid: req.body.uid,pwd:req.body.password};
    console.log(req.body)
    user.find(query,(err,data)=>{
        if (data.lenth!=0)
    {
        var sess=req.session
        sess.uid=req.body.uid
        sess.pwd=req.body.password
        console.log(req.session)
        res.render('dashboard')
    }
    else{
        res.render('index',{status:1})
    }
    })
})
app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.render('index',{status:2})
})
function check(req,res,next)
{
    if(!req.session.uid)
    {
        res.redirect('/')
    }
    else{
        next()
    }
}
app.get("/dashboard",check,(req,res)=>{
    res.render('dashboard')
})
app.get("/update",(req,res)=>{
    var sess=req.session
    res.render('update',{uid:sess.uid,pwd:sess.pwd,msg:''})
})
app.post("/update",(req,res)=>{
    var query= { uid: req.body.uid};
    var newvalues = {$set :{pwd: req.body.upassword}};
    user.updateOne(query,newvalues,function(err,data){
        res.render('update', {uid:'', pwd:'', msg:"Data Upadted Successfully!!!"})
    })
    
})
app.post('/save',(req,res)=>{
    console.log(req.body)
    var data=new item(req.body)
    data.save((err,data)=>{
        if(!err)
        {
            console.log(' Data Saved.....')
            console.log(data)
            res.redirect("/show")
        }
        else{
            console.log('Problem in Data Saved....')
            console.log(err)
        }
    })
})
app.get("/items",(req,res)=>{
    res.render('items')
})
app.get("/add",(req,res)=>{
    res.render('add')
})
app.get("/show",(req,res)=>{
    item.find((err,data)=>{
        res.render('show',{data:data})
    })
    
})
app.get("/delete",(req,res)=>{
        var id=req.query.id
        item.findByIdAndDelete(id, (err, data)=> {
            console.log(data)
            res.redirect("/show")
        })
    })
    app.get("/edit",(req,res)=>{
        var id=req.query.id
        item.findById(id, (err, data)=> {
            if(!err)
            {
                // console.log(data);
                res.render("edit",{data:data})
            }
        })
    })
    // app.post("/edit",(req,res)=>{
    //     res.render("/show")
    // })
    app.post("/modify",(req,res)=>{
        var id=req.body.id
        console.log(req.body)
        item.findByIdAndUpdate(id,{$set:req.body},(err,data)=>{
            if(!err)
            {
                res.redirect("/show");
            }
        })
    })

app.listen(3000,()=>{
    console.log("Server is Running")
})