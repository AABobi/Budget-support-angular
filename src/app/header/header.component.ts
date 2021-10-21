import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientService, User } from '../services/http-client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userPermissions: User = new User(null, null, null, null, null, null, null);
  constructor(
    public loginService: AuthenticationService,
    public httpClient: HttpClientService) { }

    ngOnInit() {
    
    }

    test(): boolean{
      /*console.log(sessionStorage.getItem('function'));
      if (sessionStorage.getItem('function') === 'admin'){
        console.log('test false');
        return false;
      }
      console.log('test true');*/
      return true;
      
    }

}
