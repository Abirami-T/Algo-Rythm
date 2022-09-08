import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { algodb } from '../model/algodb';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl : string = '';
  signUpUrl : string = '';
  searchUrl:string='';
  uploadUrl:string='';
  postUrl:string='';

  constructor(private http : HttpClient) {

    this.loginUrl = "http://localhost:3900/login/signin";
    this.signUpUrl = "http://localhost:3900/user/signup";
    this.searchUrl="http://localhost:3900/admin/search";
    this.uploadUrl=environment.apiBaseUrl+"/post";
    this.postUrl=environment.apiBaseUrl+"/comment"

  }

  login(user : User) : Observable<any> {
    return this.http.post<any>(this.loginUrl,user);
  }

  signUp(user : User) : Observable<any> {
    return this.http.post<any>(this.signUpUrl,user);
  }

  search(admin : algodb) : Observable<any> {
    return this.http.post<any>(this.searchUrl,admin);
  }
  update(admin : algodb) : Observable<any> {
    return this.http.post<any>(this.uploadUrl,admin);
  }
  pos(admin : algodb) : Observable<any> {
    return this.http.post<any>(this.postUrl,admin);
  }
  
  g(){
    return this.http.get(environment.apiBaseUrl + '/search').pipe(
      map((data: any) => {
        return data;
      })
    );
  }
  h(){
    return this.http.get(environment.apiBaseUrl + '/comments').pipe(
      map((data: any) => {
        return data;
       
      })
    );
  }

}
