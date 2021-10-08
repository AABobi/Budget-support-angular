import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpClientService, User } from '../services/http-client.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User(null, null, null, null, null, null);

  constructor(
    private router: Router,
    private httpClient: HttpClientService) { }

  ngOnInit(): void {
  }

  hello(){
    this.httpClient.firstConnection().subscribe(data => {
     this.user = data;
     alert(this.user.lastname);
    })
    alert(this.user.lastname);
    
  }
}
