import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  public currentUser:IUser

  constructor(private http: Http) { }

  loginUser(userName: string, password:string) {
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let loginInfo = { email: userName, password: password };

    return this.http.post('http://localhost:3000/users/login', JSON.stringify(loginInfo), options)
        .do(resp => {
          console.log("resp", resp);
          if(resp) {
            this.currentUser = <IUser>resp.json();
            
            // console.log("authService.currentUser", this.currentUser);
            // console.log("authService.isAuthenticated", this.isAuthenticated());
          }
        }).catch(error => {
          return Observable.of(false);
        }) ;
  }
  
  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    console.log("running checkAuthenticationStatus");

    return this.http.get('http://localhost:3000/users/me').map((response: any) => {
      console.log("response", response);
      if (response._body) {
        console.log("response.json()", response.json());
        return response.json();
      } else {
        return {}
      }
    })
    .do(currentUser => {
      console.log("currentUser", currentUser);
      if(!!currentUser.userName) {
        this.currentUser = currentUser;
      }
    }).subscribe();
  }

  updateCurrentUser(firstName:string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

  logout() {

    this.currentUser = undefined;

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.delete('http://localhost:3000/users/me/token', options);
  }
}
