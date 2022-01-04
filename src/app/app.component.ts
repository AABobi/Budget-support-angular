import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'Budget-Support-Frontend';
  vision;
  optionsLoginTrue: string[] = ['', 'Logout', 'User account'];
  constructor(public loginService: AuthenticationService,
              private router: Router){}

  ngOnInit(): void {
    this.vision = this.loginService.isUserLoggedIn();
    //console.log(this.loginService.isUserLoggedIn());
  }

 
  goToSection(section): void{
   switch (section){
     case 'Logout': {
       this.router.navigate(['LogoutComponent']);
       break;
     }
     case 'User account': {
      this.router.navigate(['UserComponent']);
      break;
    }
   }
  }

}
