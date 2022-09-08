import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  Name : string = '';
  Email : string = '';
  Password : string = '';

  user : User = new User();

  constructor( private authService : AuthService, private route : Router) { }

  ngOnInit(): void {
    this.Email = '';
    this.Password = '';
    this.Name = '';
  }

  signup() {

    this.user.Email = this.Email;
    this.user.Password = this.Password;
    this.user.Name = this.Name;
    this.user.role = 'user';
    console.log(this.user);
    this.authService.signUp(this.user).subscribe(res => {
      console.log('res');
      console.log(res);
      if(res == null) {
        alert("Registration failed");
        this.ngOnInit();
      }else {
        console.log("Registration successful");
        alert("Registration successful");
        this.route.navigate(['/']);
      }
    }, err => {
      console.log(err);
      alert("Registration failed.");
      this.ngOnInit();
    })

  }

}
