
const mongoose=require('mongoose');



const userschema= mongoose.Schema({
    Name : {
        type : String,
        require : true
    },
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
});

const user=mongoose.model('user',userschema);



module.exports=user;

