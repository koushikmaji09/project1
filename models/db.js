const mongoose=require('mongoose')
 mongoose.connect('mongodb://localhost:27017/IdeaList',{useNewUrlParser:true},(err)=>{
    if(!err)
    console.log("Connected")
    else
    console.log("Problem in Connection")
 })
 require('./user.model')