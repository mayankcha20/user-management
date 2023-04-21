const mongoose=require('mongoose');
const schema=mongoose.Schema;
const customerschema=new schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
});


module.exports=mongoose.model('customerm',customerschema);