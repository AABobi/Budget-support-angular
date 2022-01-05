import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Budget, History, HttpClientService, User, UserAssignmentToGroup } from '../services/http-client.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userVision = null;
  listOfBudgets = null;
  listOfDescription: Budget[];
  constructor(public httpClient: HttpClientService,
              public router: Router) { }

  ngOnInit(): void {
    if(this.userVision == null){
      this.userVision = true;
    }
    //const user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null, null);
   this.httpClient.findUser(sessionStorage.getItem('nickname')).subscribe(userReq => {
      this.listOfBudgets = userReq.history;
    });
  }
  backToTheHistory(): void{
    this.userVision = true;
  }
  deleteEntry(budget: Budget){
    this.httpClient.deleteEntryHistory(budget, budget.id).subscribe(reqHi => {
      this.listOfDescription = reqHi.budgetList;
      window.location.reload;
    });
  }
  testRefrest(){
    console.log(this.listOfDescription.length);
    console.log(this.listOfDescription[0].description);
    console.log(this.listOfDescription[0].budgetName);
    console.log('test');
  }
  remove(history: History): void{
    this.httpClient.deleteHistoryEntry(history, sessionStorage.getItem('nickname')).subscribe(newHistoryArray => {
      this.listOfBudgets = newHistoryArray;
       window.location.reload;
     });
  }

  showBudget(history: History): void{
    this.listOfDescription = history.budgetList;
    console.log(this.listOfDescription.length);
    this.userVision = false;
  }



}
