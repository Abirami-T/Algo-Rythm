const mongoose=require('mongoose');

const loginschema=mongoose.Schema({
    Email : {
        type : String,
        require : true
    },
    Password : {
        type : String,
        require : true
    },
    loginDate : {
        type : Date,
        default : Date.now
    }   
})

const loginuser=mongoose.model('loginuser',loginschema);
module.exports=loginuser;