

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser = require('body-parser');

const path=require('path');
const ejs=require('ejs');
const router=express.Router();
const fs = require('fs');



const commentschema= mongoose.Schema({
    Name : {
        type : String,
        require : true
    }, 
   comment:{
    type : String,
    require : true
   },
    loginDate : {
        type : Date,
        default : Date.now
    }
});

const commenti=mongoose.model('comment',commentschema);

router.post('/comment',async(req,res,next)=>{
    let {Name,comment}=req.body;
    Name=Name.trim();
    comment=comment.trim();
    const newcomment=new commenti({
        Name,
        comment,
    })
    await newcomment.save()
    .then(result=>{
        console.log();
        res.status(200).json({
            Status: "success",
            message: "upload successfully",
            date : result,
            
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(200).json({
            Status : "Failed"
        })
    })
})
router.get('/comments',async(req,res)=>{
    commenti.find((error, data) => {
      if (error) {
          return next(error);
      } else {
          res.json(data);
      }
  });
  })


module.exports=router;

