const express=require('express');
const app=express();
const morgan =require('morgan');
const mongoose=require('mongoose');
require('dotenv/config');
const userapi=require('./userapi');
const loginapi=require('./loginapi');
const bodyParser = require('body-parser');
const cors=require('cors');
const image_videodb=require('./image_videodb');
const comments=require('./comments');
app.use(bodyParser.urlencoded({limit:"500mb",extended:true,parameterLimit:100000}));
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.json());




app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(cors({origin:'http://localhost:4200'}));
  app.set('view engine','ejs');
app.use("/uploads",express.static('uploads'));

  app.use('/user',userapi);
  app.use('/login',loginapi);

  app.use('/admin',image_videodb);
  app.use('/admin',comments);

/*  app.get('/',(req,res)=>{
    res.status(200).json("connected...");
})
*/
  app.listen(3900,(err)=>{
    if(err)
    {
        console.log(err)
        
    }else{
        console.log("server start")
    }
});


//dbserver connect

mongoose.connect(process.env.DB_CONNECTION,(err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log("connected")
    }
    
})