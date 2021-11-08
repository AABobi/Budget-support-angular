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
    addNewFriendToTheBudgetObj: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null);
    
    
  friendNick: string;
  userVision = true;
  listOfBudgets: UserAssignmentToGroup[] = [];
  inviteNewFriendToTheBudget: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null);
  budgetArray: Budget[] = [];
  budgetArray2: Budget[] = [
    {
       id: 100,
       description: 't',
       value: 2,
       uniqueGroupCode: 't',
       budgetName: 't',
       userName: 't'
    }
  ];
  value: number;
  description: string;

  userForDisplayBudgets: User = new User(null, null, null, null, null, null, null, null);
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

  // This method gets obj from html, saves it for second method 
  addNewMemberToTheBudget(budget: UserAssignmentToGroup): void{
      this.inviteNewFriendToTheBudget = budget;
      this.userVision = false;
   }
// This method creates object user only with nick, sends this obj to the server.
// Server returns object from data base with this nickname and after that method adds budget(userAssignmentToGroup) to the user budgets list
   addNewMemberToTheBudget2(): void{
    const user: User = new User(null, this.friendNick, null, null, null, null, null, null);
    this.httpClient.findUser(user).subscribe(data => {
      data.userAssignmentToGroup.push(this.inviteNewFriendToTheBudget);
      this.httpClient.addNewMemberToTheBudget(data).subscribe();
    });
    this.userVision = true;
 }

 // This method adds description to the budget
  addDescriptionToTheBudget(): void{
      // tslint:disable-next-line:prefer-const
      let user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null);
      this.httpClient.findUser(user).subscribe(data => {
        user = data;
        this.httpClient.addDescriptionToTheBudget(user).subscribe( data => {
          const budget: Budget = new Budget(null, this.description, this.value, sessionStorage.getItem('uniqueCode')
          , sessionStorage.getItem('budgetName'), user.nickname);
          // tslint:disable-next-line:space-before-function-paren
          user.userAssignmentToGroup.forEach(function (value){
            if (value.uniqueGroupCode === sessionStorage.getItem('uniqueCode')){
              value.budgetList.push(budget);
            }
          });
          this.httpClient.addDescriptionToTheBudget(user).subscribe();
          window.location.reload();
        });
      });
    


}
// This method navigate to create method in differnt component.
  createBudget(): void{
    this.router.navigate(['CreateBudgetComponent']);
  }
// This mathod changes vision. Home page in this component is list of budgets(userAssignemtToGroup objects)
// If we click "Show budgets" button this mathod will change vision (userVision field to false).
// tslint:disable-next-line:max-line-length
// When user click on button for specific budget this method gets object of this budget and will write listOfBudgets from this object do arrray).
// And after that, this method will change vision and display that arrray,
  changeVision(budgets: UserAssignmentToGroup): void{
    let sizeBudgetArrayDisplay = 0;
    const budgetArrayInsideThisMethod: Budget[] = [];
    if (this.userVision){
      sessionStorage.setItem('uniqueCode', budgets.uniqueGroupCode);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < budgets.budgetList.length; i++){
      if (budgets.budgetName === budgets.budgetList[i].budgetName) {
        budgetArrayInsideThisMethod[i - sizeBudgetArrayDisplay] = budgets.budgetList[i];
      }else{
        sizeBudgetArrayDisplay++;
      }

      this.budgetArray = budgetArrayInsideThisMethod;

      }
      let user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null);
      let budgetArray3: Budget[] = [];
      console.log(sessionStorage.getItem('uniqueCode'));
      this.httpClient.findUser(user).subscribe(data => {
        user = data;
        user.userAssignmentToGroup.forEach(function(obj){
            if (obj.uniqueGroupCode === sessionStorage.getItem('uniqueCode')){
              budgetArray3 = obj.budgetList;
              console.log(budgetArray3.length);
              }
          });
        this.budgetArray2 = budgetArray3;
        });
      console.log(this.budgetArray2.length);
      this.userVision = false;
   }else{
    this.userVision = true;
  }
  }

  deleteEntry(budget: Budget): void{
      this.httpClient.deleteEntry(budget).subscribe( data => {
        const userAssignmentToGroup: UserAssignmentToGroup = data;

      });
  }
  // tslint:disable-next-line:typedef
  deleteBudget(uniqueGroupCode: number){
    this.httpClient.deleteBudget(uniqueGroupCode).subscribe();
    window.location.reload();
  }
}
