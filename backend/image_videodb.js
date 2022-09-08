const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const multer=require('multer');
const path=require('path');
const ejs=require('ejs');
const router=express.Router();
const fs =require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit:"500mb",extended:true,parameterLimit:100000}));

imageschema=new mongoose.Schema({
    name :String,
    field : String,
    topic:String,  
    video : {
      type:String,
      required:true
    },
    links:{
      type:String,
      required:true
    },
    
    image :{
      type:String,
      required:true
    }
        
  
   
});

const algodb=mongoose.model('algodb',imageschema);

const storage =multer.diskStorage({
    destination: function(_req, _file, cb) {
      cb(null, './uploads');
    },
    filename:function(_request, file, cb) {
        //cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
        //cb(null,`${file.originalname}`)
       cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
      },

     
    
  })


  
  const fileFilter = (_req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
  });

//router.post('/post',upload.single("image"),async(req,res,next)=>{
  router.post('/post',upload.single("image"),async(req,res,_next)=>{
    
        let {name,topic,field,video,links,image}=req.body;
        
      // let {name,topic,field,video}=req.body;
       name=name.trim();
       field=field.trim();
       topic=topic.trim();
       video=video.trim();
       links=links.trim();
       
       
       // image=image.trim();
       //xx=req.file.fieldname;
      // console.log(xx);
    console.log("posting");
    ///console.log(req.file);
    const file=req.file;
   //req.body.image=req.file.path,
   // req.body.qrcode=req.file.path
   console.log(req.body.file);
   const files=req.file;
   console.log(files);
   const xxx=`http://localhost:3900/uploads/${image}`;
    console.log(xxx);
    image =xxx;
    const newalgodb=new algodb({
        name,
        field,
        topic,
        video,
        links,
      image
      // qrcode
    });
    
    console.log("fdgfg");
    await newalgodb.save()
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

  /*  const newalgodb= new algodb();
    newalgodb.name=req.body.name;
    newalgodb.field=req.body.field;
    newalgodb.video=req.body.video;
    newalgodb.image=req.file.filename;
   // newalgodb.qrcode=req.file.filename;
    newalgodb.save((err,doc)=>{
        if(err){
            console.log('err');
            console.log(err);
        } else{
            console.log('saved successfully');
           // res.redirect('/');
        }
    })*/
});

router.get('/search',async(req,res)=>{
  algodb.find((error, data) => {
    if (error) {
        return next(error);
    } else {
        res.json(data);
    }
});
})

router.post('/searchs',async(req,res)=>{
  let{topic}=req.body;
  if(topic==""){
    res.status(200).json({
      Status:"failed",
      msg : "empty search box"
    })
  }else{
    algodb.find({topic})
    .then(data=>{
      if(data.length){
        console.log(data);
        
        if(data){
          console.log(data);
          res.status(200).json({
            Status:"success",
            data:data
          })
        }
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
})



module.exports=router;