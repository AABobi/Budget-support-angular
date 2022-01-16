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
  isUserLoggedIn(): boolean {
   
    const user = sessionStorage.getItem('nickname');
    if ((user === 'NC') || (user === null)){
      return false;
    }
    else {
      return true;
    }
  }

  isAdminLoggedIn(): boolean {
    /*const user = sessionStorage.getItem('function');
    console.log('idadminlogged - authentication');
    console.log(sessionStorage.getItem('function'));
    console.log(!(user === null));*/
    
    const role = sessionStorage.getItem('role');
    if (this.isUserLoggedIn() && role === 'ADMIN'){

     return true;
   }else{
     return false;
   }

  }

  logout(): void
  {sessionStorage.removeItem('nickname');
}
}
