import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ProjectService {

  options;
  authToken;
  domain = "http://localhost:8080/";

  constructor(private authService : AuthService, private http: Http) { }

  createAuthenticationHeaders() {
    this.loadToken(); 
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', 
        'authorization': this.authToken 
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }


  getAllMembers(){

    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'projects/allUsers', this.options).map(res => res.json());

  }

}
