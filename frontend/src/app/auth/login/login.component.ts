import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Email : string = '';
  Password : string = '';
  role : string = '';

  user : User = new User();
  roles : string[];
  

  constructor(private authService : AuthService, private route : Router ) { 
    this.roles = [
      'admin',
      'user'
    ]
  }

  ngOnInit(): void {
    this.Email = '';
    this.Password = '';

  }

  signin() {
    this.user.Email = this.Email;
    this.user.Password = this.Password;
    this.user.role = this.role;
  console.log(this.user);
  console.log(this.user.Email);
  console.log(this.Password);
    this.authService.login(this.user).subscribe(res => {

      if(res == null) {
        alert("Uername or password is wrong");
        this.ngOnInit();
      }else {
        console.log("Login successful");
        
        alert("Login successfully");
        localStorage.setItem("token",res.token);
        if(this.role == 'user') {
          this.route.navigate(['/user']);
        } 

        if( this.role == 'admin') {
          this.route.navigate(['/admin']);
        }

      }

    }, err => {
      console.log(err);
      alert("Login failed");
      this.ngOnInit();
    })

  }

}
