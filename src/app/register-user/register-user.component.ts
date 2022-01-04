import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService, Password, User } from '../services/http-client.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  email: string = null;
  name: string = null;
  lastname: string = null;
  nickname: string = null;
  passwordString: string = null;
  password: Password = new Password(null, null);
  vision: boolean;
  constructor(private router: Router,
              public httpClient: HttpClientService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.vision = false;
    // If in URL is code afetr "/" then method change vision to confirm account
    if (this.route.snapshot.paramMap.get('code') === null){
      this.vision = true;
    }
  }

  // Send code from param to "confirmUser" method and it will be confirmed in batabase
  confirm(): void{
    this.httpClient.confirmUser(this.route.snapshot.paramMap.get('code')).subscribe(data => {
      alert(data[0]);
      this.router.navigate(['LoginComponent']);
    });
  }

  goToLogin(): void{
    this.router.navigate(['LoginComponent']);
  }
// This method checks if email excists in db if it not then we can create an account
  registerUser(): void{
  this.httpClient.findEmail(this.email).subscribe(data => {
    console.log(data[0]);
    switch (data[0]){
      case 'Free': {
        if (this.email === null || this.name === null || this.lastname === null || this.nickname === null || this.passwordString === null){
          alert('Fill in all fields');
        }else{
          this.password.password = this.passwordString;
          const user: User = new User(null, this.nickname, this.name, this.lastname, this.email, this.password, null, null, false);
          this.httpClient.createUser(user).subscribe(data => {
            alert(data[0]);
          });
        }
        break;
      }
      case 'Found': {
        alert('An account with this e-mail address already exists. User another e-mail or recover password');
        break;
      }
    }
  });
  }
}
