import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import  algodata  from 'src/app/algodbs.json'
import { AuthService } from 'src/app/service/auth.service';
import { algodb } from 'src/app/model/algodb';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
 
  userList:any;
  commentlist:any;
  loader = true;
  searchText:any;

  Name : string='';
  comment : string='';
 
  admin : algodb = new algodb();
  constructor(private authService : AuthService, private route : Router, private httpClient : HttpClient) { 
   // this.userList=[];
  }


  ngOnInit(): void {
   // this.getUserList();
    this.authService.g().subscribe((userLists)=>{
      this.userList=userLists;
      this.loader = false;
      console.log(this.userList);
    })
    this.authService.h().subscribe((commentlists)=>{
      
      this.commentlist=commentlists;
      this.loader=false;
      console.log(this.commentlist);
    })
    this.Name ='';
    this.comment='';
   
  }


posting(){
  this.admin.Name =this.Name;
    this.admin.comment =this.comment;
   
    
    console.log(this.admin);
  this.authService.pos(this.admin).subscribe(res => {
    console.log('res');
      console.log(res);
      if(res == null) {
        alert("fail to save");
        this.ngOnInit();
      }else {
        console.log("saved successful");
       
        
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


/* getUserList(){
  this.httpClient.get('http://localhost:3900/admin/search')
  .pipe(map((res:any)=>{
    const products =[];
    for(const key in res){
      if(res.hasOwnProperty(key)){
        products.push({...res[key]})
      }
    }
    return products;
  }))
  .subscribe((res:any)=>{

  this.userList=res;
  
  console.log(res);
 // console.log(this.userList);
 // console.log(this.algos);
  localStorage.setItem("algodbs",res);
 // console.log("test test"+JSON.stringify(this.userList,null,"   "));
 // this.userList=JSON.stringify(this.userList,null,"   ");
 // console.log("user   "+this.userList);
  })
 }*/

}
