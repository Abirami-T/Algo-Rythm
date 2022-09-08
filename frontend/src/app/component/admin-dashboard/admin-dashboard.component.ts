import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { algodb } from 'src/app/model/algodb';



@Component({
  selector: 'app-file-upload',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


//npm install -g npm
  name : string='';
  field : string='';
  topic : string='';
  image : string='';
  video : string='';
  links : string='';
  admin : algodb = new algodb();
  //, private toastr: ToastrService
  constructor(private authService : AuthService, private route : Router ) { 
    }

  

  ngOnInit(): void {
 
    this.name ='';
    this.field ='';
    this.topic= '';
    this.image = '';
    this.video = '';
    this.links='';
    
  }

  selectImage(event:any) {
    console.log(event.target.files.length);
    if (event.target.files.length == 1) {
      const file = event.target.files[0];
      console.log(file);
      this.image = file.name;
    }
  }


  

  
  update() {

      
    
    this.admin.name =this.name;
    this.admin.field =this.field;
    this.admin.topic= this.topic;
    this.admin.image = this.image;
    this.admin.video = this.video;
   this.admin.links = this.links;
    
    console.log(this.admin);
  this.authService.update(this.admin).subscribe(res => {
    console.log('res');
      console.log(res);
      if(res == null) {
        alert("fail to save");
        this.ngOnInit();
      }else {
        console.log("saved successful");
        alert("saved successful");
        
      }
    }, err => {
      console.log(err);
      alert(" failed.");
      this.ngOnInit();
    })
  }
  reloads(){
    window.location.reload();
  }
  }

