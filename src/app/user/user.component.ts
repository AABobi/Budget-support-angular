import { Component, OnInit } from '@angular/core';
import { Budget, HttpClientService, List, User, UserAssignmentToGroup } from '../services/http-client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})



export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    public httpClient: HttpClientService) { }
  userVision = true;
  listOfBudgets: UserAssignmentToGroup[] = [];
  budgetArray: Budget[] = [];

  userForDisplayBudgets: User = new User(null, null, null, null, null, null, null, null, );

  usersArray: User[] = [
    {
      id: 1,
      nickname: 'test',
      name: 'aa',
      email: 'aa',
      lastname: 'aa',
      password: null,
      userAssignmentToGroup: null,
      permission: null
     }
  ];
  ngOnInit(): void {
    const user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null);
    this.httpClient.findAllBudgetsOfUser(user).subscribe(data => {
     this.userForDisplayBudgets = data;
     this.listOfBudgets = data.userAssignmentToGroup;
        });
  }

  createBudget(): void{
    /*const array: string[] = [];
    array.push('test');
    array.push('test2');
    this.httpClient.createBudget(array).subscribe();*/
    this.router.navigate(['CreateBudgetComponent']);
  }

  changeVision(budgets: UserAssignmentToGroup): void{
    let sizeBudgetArrayDisplay = 0;
    const budgetArrayInsideThisMethod: Budget[] = [];
    if (this.userVision){
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < budgets.budgetList.length; i++){
      if (budgets.budgetName === budgets.budgetList[i].budgetName) {
        budgetArrayInsideThisMethod[i - sizeBudgetArrayDisplay] = budgets.budgetList[i];
      }else{
        sizeBudgetArrayDisplay++;
      }

      this.budgetArray = budgetArrayInsideThisMethod;

      }
      this.userVision = false;
  }else{
    this.userVision = true;
  }
  }

  // tslint:disable-next-line:typedef
  deleteBudget(uniqueGroupCode: number){
    this.httpClient.deleteBudget(uniqueGroupCode).subscribe();
    window.location.reload();
  }
}
