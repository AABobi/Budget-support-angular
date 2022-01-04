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
  // To set vision.
  userVision = true;
  // Te see user budgets.
  listOfBudgets: UserAssignmentToGroup[] = [];
  // To delete userAssignmentToGruop
  userAssignmentToGroup: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null);
  // To invite new member to group. (Method changeVision set this)
  inviteNewFriendToTheBudgetAndDisplayDescriptions: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null);
  budgetArray: Budget[] = [];
  budgetArray2: Budget[] = [];
  value: number;
  description: string;

  userForDisplayBudgets: User = new User(null, null, null, null, null, null, null, null);
  usersArray: User[] = [];
  ngOnInit(): void {
    this.listOfBudgets = [];
    const user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null);
    this.httpClient.findAllBudgetsOfUser(user).subscribe(data => {
     this.userForDisplayBudgets = data;
     this.listOfBudgets = data.userAssignmentToGroup;
    });
  }

  getNumber(): number{
    return 2;
  }
  // This method gets obj from html, saves it for second method
  addNewMemberToTheBudget(): void{
      const user: User = new User(null, this.friendNick, null, null, null, null, null, null);
      this.userVision = false;
      this.httpClient.findUser(user).subscribe(data => {
        data.userAssignmentToGroup.push(this.inviteNewFriendToTheBudgetAndDisplayDescriptions);
        this.httpClient.addNewMemberToTheBudget(data).subscribe();
      });
   }


 // This method adds description to the budget
  addDescriptionToTheBudget(): void{
      // tslint:disable-next-line:prefer-const
      console.log();
      // To get findUser data.
      let user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null);
      // To get value from forEach.
      let userAssign: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null);
      this.httpClient.findUser(user).subscribe(data => {
        user = data;
        user.userAssignmentToGroup.forEach(function(obj){
          if (obj.uniqueGroupCode === sessionStorage.getItem('uniqueCode')){
            userAssign = obj;
           }
        });
        // Create object budget to add him to the uAsG list.
        const addDiscription: Budget = new Budget(null, this.description, this.value, sessionStorage.getItem('uniqueCode'),
        userAssign.budgetName, sessionStorage.getItem('nickname'), null);
        console.log(addDiscription);
        userAssign.budgetList.push(addDiscription);

        this.httpClient.addDescriptionToTheBudget(userAssign).subscribe();

        // Use this mathod to refresh description.
        this.ngOnInit();
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
  changeVision(uAtG: UserAssignmentToGroup): void{
    this.ngOnInit();
    // Sets this object for method which can add new member.
    this.inviteNewFriendToTheBudgetAndDisplayDescriptions = uAtG;
   // let sizeBudgetArrayDisplay = 0;
    // usun const budgetArrayInsideThisMethod: Budget[] = [];
    // todo
    if (this.userVision){
      sessionStorage.setItem('uniqueCode', uAtG.uniqueGroupCode);
      // tslint:disable-next-line:prefer-for-of
      /* usun for (let i = 0; i < uAtG.budgetList.length; i++){
      if (uAtG.budgetName === uAtG.budgetList[i].budgetName) {
        budgetArrayInsideThisMethod[i - sizeBudgetArrayDisplay] = uAtG.budgetList[i];
      }else{
        sizeBudgetArrayDisplay++;
      }*/

      // usun this.budgetArray = budgetArrayInsideThisMethod;}

      let user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null);
      // let budgetArray3: Budget[] = [];

      // tslint:disable-next-line:max-line-length
      // I don't know how to give value to inviteNewFriendToTheBudgetAndDisplayDescriptions in IF STATEMENT so create this variable to get value.
      let uAsGobjForIfStatement: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null);
      this.httpClient.findUser(user).subscribe(data => {
        user = data;
        // Pobieramy użytkownika z bazy danych i znajdujemy w nim uAtG, który chcemy wyświetlić i przypisujemy go do budgetArray2.
        user.userAssignmentToGroup.forEach(function(obj){
            if (obj.uniqueGroupCode === sessionStorage.getItem('uniqueCode')){
              uAsGobjForIfStatement = obj;
              // budgetArray3 = obj.budgetList;
              // this.userAssignmentToGroup = obj;
              // console.log(budgetArray3.length);
              }
          });
        // this.budgetArray2 = budgetArray3;
        this.inviteNewFriendToTheBudgetAndDisplayDescriptions = uAsGobjForIfStatement;
        });
      // console.log(this.budgetArray2.length);
      this.userVision = false;
   }else{
    this.userVision = true;
  }
  }

  deleteEntry(budget: Budget): void{
    // this.httpClient.deleteEntry(budget).
  }
  // tslint:disable-next-line:typedef
  deleteBudget(uasg: UserAssignmentToGroup){
    this.httpClient.deleteBudget(uasg).subscribe( data => {
      this.ngOnInit();
    });
     }

     // Method get object uasg from button html and them create array only with this object.
     // After that create object user with ONLY user nickname and LIST with object uasg. In the end send user to leaveBudget method.
  leaveBudget(uasg: UserAssignmentToGroup): void{
      const uasgList: Array<UserAssignmentToGroup> = [uasg];
      const user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, uasgList, null);

      this.httpClient.leaveBudget(user).subscribe( data => {
        this.ngOnInit();
      });
  }
}
