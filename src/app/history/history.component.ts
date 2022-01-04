import { Component, OnInit } from '@angular/core';
import { HttpClientService, User } from '../services/http-client.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userVision = true;
  listOfBudgets = null;
  constructor(public httpClient: HttpClientService) { }

  ngOnInit(): void {
   const user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null, null);
   this.httpClient.findUser(user).subscribe(userReq => {
      this.listOfBudgets = userReq.history;
    });
  }
  refresh(): void{
    this.ngOnInit();
  }
}
