const bodyParser = require('body-parser');
const express=require('express');
const mongoose = require('mongoose');
const router=express.Router();
const bcrypt=require('bcrypt');

const user=require('./userschema.js');

//const app=express();
//app.use(bodyParser.json());
//app.use(express.urlencoded({
  //  extended:true
//}));


 //getby id
 router.post('/signup',async(req,res)=>{
    let {Name,Email,Password}=req.body;
    Name=Name.trim();
    Email=Email.trim();
    Password=Password.trim();
 
    if(Name=="" || Email=="" || Password==""){
        res.status(200).json({
            Status : "Failed",
            message : "Empty input fields!"
        });
    }else if(!/^[a-zA-z ]*$/.test(Name)){
        res.status(200).json({
            Status : "Failed",
            message : "Invalid name entered"
        })
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)){
        res.status(200).json({
            Status : "Failed",
            message : "invalid email entered"
        });
    }else if(Password.length < 8){
        res.status(200).json({
            Status : "Failed",
            message : "Password is too short"
        });
    }else{
        user.find({Email})
        .then(result => {
            console.log(result);
            console.log('result');
            console.log(result.length);
            if(result.length){
                res.status(200).json({
                    Status : "Failed",
                    message : "User with the provided email already exists"
                });
            }else{
                const saltRounds=10;
                
                bcrypt.hash(Password,saltRounds).then(hashedPassword=>{
                   
                   // const xxx = hashedPassword;
                   // console.log(xxx);
                    const newuser=new user({
                        Name,
                        Password: hashedPassword,
                        Email                        
                    });
                    newuser.save().then(result=>{
                        console.log(result);
                        res.status(200).json({
                            Status: "success",
                            message: "signup successfully",
                            date : result,
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(200).json({
                            Status : "Failed",
                            message : "An error occured while saving user account!"
                        })
                    })
                })
                .catch(err =>{
                    console.log(err);
                    res.status(200).json({
                    Status : "Failed",
                    message : "An error occured while hasing password!"
                })
        })
            }
        })
        .catch(err =>{
            console.log(err);
            res.status(200).json({
                Status : "Failed",
                message : "An error occured while checking for existing user!"
            })
        })
    }
     
  });
  
 //update
 

module.exports=router;

