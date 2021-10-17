import { Injectable, OnInit  } from '@angular/core';
import { HttpClientService, User } from './http-client.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  constructor(
    private httpClient: HttpClientService
  ) { }


  // tslint:disable-next-line:contextual-lifecycle
  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  isUserLoggedIn() {
    const user = sessionStorage.getItem('function');
    console.log(!(user === null));
    return !(user === 'test');
  }
}
