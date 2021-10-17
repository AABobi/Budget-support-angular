import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpClientService,Password, User } from '../services/http-client.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User(null, null, null, null, null, null, null);
  nickname = '';
  username = '';
  userlastname = '';
  passwordd = '';
  stringIfWrongLogIn = '';
  loginPass: User = new User(null, null, null, null, null, null, null);
  findUserObj: User = new User(null, null, null, null, null, null, null);
  password: Password = new Password(0,'');
  constructor(
    private router: Router,
    private httpClient: HttpClientService) { }

  ngOnInit(): void {
  }

  checkLogin(): void{
    /*this.loginPass.nickname = this.nickname;
    this.password.password = this.passwordd;
    this.loginPass.password = this.password;
    this.httpClient.checkLogin(this.loginPass).subscribe(
    data => {this.findUserObj = data;
             if (this.findUserObj.name === 'NC'){
      this.stringIfWrongLogIn = 'NC';
      }
    }
    );*/
    sessionStorage.setItem('function', 'test');
  }}
