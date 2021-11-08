import { Component, OnInit } from '@angular/core';
import { Budget, HttpClientService, List, User, UserAssignmentToGroup } from '../services/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.css']
})
export class CreateBudgetComponent implements OnInit {

  groupName: string;
  constructor(
    public httpClient: HttpClientService,
    public router: Router) { }

  ngOnInit(): void {
  }

// User writes budget name in html window ( groupName field) and this method gets this parameter as field[0])
// Second place in array is nickname of user which create this array.
// Method send this data to server and server will create budget with that name and will add this budget to he user budgets list.
  createNewBudget(): void{
    const arrayWithInformationAboutNewBudget: string[] = [];
    console.log(this.groupName);
    arrayWithInformationAboutNewBudget.push(this.groupName);
    arrayWithInformationAboutNewBudget.push(sessionStorage.getItem('nickname'));
    this.httpClient.createBudget(arrayWithInformationAboutNewBudget).subscribe();
    this.router.navigate(['UserComponent']);
 }
}
