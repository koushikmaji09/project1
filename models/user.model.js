const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    uid:String,
    pwd:String
})
module.exports=mongoose.model('IdealList',userSchema)

const itemSchema=new mongoose.Schema({
    ctg:String,
    iname:String,
    dc:String,
    qnt:Number,
    iprice:Number
})
mongoose.model('ItemlList',itemSchema)
