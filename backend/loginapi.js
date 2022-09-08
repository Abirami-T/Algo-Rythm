const bodyParser = require('body-parser');
const express=require('express');
const mongoose = require('mongoose');
const route=express.Router();
const bcrypt=require('bcrypt');
const user=require('./userschema');
const loginuser=require('./loginschema.js');

route.post('/signin',async(req,res)=>{
    let {Email,Password}=req.body;
    
    Email=Email.trim();
    Password=Password.trim();
    if( Email=="" || Password==""){
        res.status(200).json({
            Status : "Failed",
            message : "Empty credentials supplied"
        })
    }else{
        user.find({Email})
        .then(data =>{
           if(data.length){
            console.log(data);
            const hashedPassword=data[0].Password;
            //console.log(Password);
           // console.log(hashedPassword);
            bcrypt.compare(Password,hashedPassword).then(result=>{
               console.log(result);
                if(result){
                    const nowloginuser=new loginuser({
                        Password: hashedPassword,
                        Email                        
                    });
                    nowloginuser.save().then(data=>{
                        console.log(result);
                        res.status(200).json({
                            Status : "success",
                            message : "signin successfully",
                            data : data,
                        })
                    })
                    
                }else{
                    console.log(err);
                    res.status(200).json({

                        Status : "Failed",
                        message : "Invalid password entered!",
                    })
                }
            })
            .catch(err=>{
                
                res.status(200).json({
                    Status : "Failed",
                    message : "An error occured while comparing passwords!",
                })
            })
        }else{
           
            res.status(200).json({
                Status : "Failed",
                message : "Invalid credentials entered!",
            })
        }
        })
        .catch(err=>{
            console.log(err);
            res.status(200).json({
                Status : "Failed",
                message : "An error occured while checking for existing user!",
            })
        }) 
    }
     
  });
  module.exports=route;