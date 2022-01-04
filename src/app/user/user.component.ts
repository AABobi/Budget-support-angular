import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { Budget, ExpectedExpenses, HttpClientService, Permission, User, UserAssignmentToGroup} from '../services/http-client.service';
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
    addNewFriendToTheBudgetObj: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null, null);


  // Total values
  TotalValue = 0;
  // Variable to add new friend to the budget.
  friendNick: string;
  // To set vision.
   userVision: boolean;

   budgetVision: boolean;

  budgetWithPermissionToRemove: Array<UserAssignmentToGroup>;
  budgetWithoutPermissionToRemove: Array<UserAssignmentToGroup>;

   // userVision = false;
  // Te see user budgets.
  listOfBudgets: UserAssignmentToGroup[] = [];
  // To delete userAssignmentToGruop
  userAssignmentToGroup: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null, null, null, null, null, null);
  // To invite new member to group. (Method changeVision set this)
  // tslint:disable-next-line:max-line-length
  inviteNewFriendToTheBudgetAndDisplayDescriptions: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null, null, null, null, null, null);
  budgetGoal = 0;
  expectedExpenses = 0;
  budgetArray: Budget[] = [];
  budgetArray2: Budget[] = [];
  // Variables to add description
  value: number;
  description: string;

  fontColor: boolean;

  userForDisplayBudgets: User = new User(null, null, null, null, null, null, null, null, null);
  usersArray: User[] = [];

  ngOnInit(): void {
    // When we use back button and want go to budget details not budget list
    if (sessionStorage.getItem('visionWhenGoBack') === 'false'){
      this.userVision = false;
      sessionStorage.setItem('visionWhenGoBack', 'true');
      this.httpClient.findBudget(sessionStorage.getItem('uniqueCode')).subscribe(uatg => {
      this.inviteNewFriendToTheBudgetAndDisplayDescriptions = uatg;
      this.expectedExpenses = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.inviteNewFriendToTheBudgetAndDisplayDescriptions.expectedExpensesList.length; i++){
        this.expectedExpenses += this.inviteNewFriendToTheBudgetAndDisplayDescriptions.expectedExpensesList[i].value;
      }
      this.TotalValue = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.inviteNewFriendToTheBudgetAndDisplayDescriptions.budgetList.length; i++){
        this.TotalValue += this.inviteNewFriendToTheBudgetAndDisplayDescriptions.budgetList[i].value;
      }
      if (this.inviteNewFriendToTheBudgetAndDisplayDescriptions.goal < this.TotalValue){
        this.fontColor = true;
       }else{
         this.fontColor = false;
       }
      });
      }
    if (this.userVision == null){
    this.userVision = true;
    }// Displayed budgets.
    this.listOfBudgets = [];
    const user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null, null);
    // Finds budgets belongs to user.
    this.httpClient.findAllBudgetsOfUser(user).subscribe(data => {
    this.httpClient.moveGroupToTheHistory(data).subscribe(userChecked => {
      this.listOfBudgets = userChecked.userAssignmentToGroup;
      this.userForDisplayBudgets = userChecked;
      this.httpClient.setRemoveButtonPermission(this.listOfBudgets, sessionStorage.getItem('nickname')).subscribe(req => {
        this.budgetWithPermissionToRemove = req[0];
        this.budgetWithoutPermissionToRemove = req[1];
  });
});
   });
   }


  addExpectedExpanses(): void{
    // tslint:disable-next-line:no-unused-expression
    this.router.navigate(['ExpectetExpansesComponent']);
  }

  // This method gets obj from html, saves it for second method
  addNewMemberToTheBudget(): void{
    // New user for "findUser method, to send only nickname"
      const userToAdd: User = new User(null, this.friendNick, null, null, null, null, null, null, null);
      // To this object method save returned permission from "checkPermission" method
      let objectToCheckPermission: Permission = new Permission(null, null, null);
      // Here method checks if user whick what to add new member have permission to do that
      this.httpClient.checkPermission(sessionStorage.getItem('uniqueCode'), sessionStorage.getItem('nickname')).subscribe( data => {
        objectToCheckPermission = data;
        if (objectToCheckPermission.typeOfPermission < 3){
          // If permission is good method will find user which we want to add,
          this.httpClient.findUser(userToAdd).subscribe(founduser => {
            // If user haven't any group in his list we create new list and set it
            if (founduser.userAssignmentToGroup.length === 0){
            const newArray: UserAssignmentToGroup[] = [];
            newArray.push(this.inviteNewFriendToTheBudgetAndDisplayDescriptions);
            founduser.userAssignmentToGroup = newArray;
            }else{
              founduser.userAssignmentToGroup.push(this.inviteNewFriendToTheBudgetAndDisplayDescriptions);
            }
            this.httpClient.addNewMemberToTheBudget(founduser, sessionStorage.getItem('uniqueCode')).subscribe( message => {
              alert(message[0]);
            });
          });
        }else{
          alert('You do not have permission to do that');
        }
      });
     }


 // This method adds description to the budget
  addDescriptionToTheBudget(): void{
      // tslint:disable-next-line:prefer-const
      // To get findUser data.
      let user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null, null);
      // To get value from forEach.
      let userAssign: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null, null, null, null, null, null);
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
        userAssign.budgetList.push(addDiscription);

        this.httpClient.addDescriptionToTheBudget(userAssign).subscribe(dataa => {
          this.inviteNewFriendToTheBudgetAndDisplayDescriptions = dataa;
       
          this.expectedExpenses = 0;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.inviteNewFriendToTheBudgetAndDisplayDescriptions.expectedExpensesList.length; i++){
        this.expectedExpenses += this.inviteNewFriendToTheBudgetAndDisplayDescriptions.expectedExpensesList[i].value;
      }
          this.TotalValue = 0;
      // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.inviteNewFriendToTheBudgetAndDisplayDescriptions.budgetList.length; i++){
        this.TotalValue += this.inviteNewFriendToTheBudgetAndDisplayDescriptions.budgetList[i].value;
      }
          if (this.inviteNewFriendToTheBudgetAndDisplayDescriptions.goal < this.TotalValue){
        this.fontColor = true;
       }else{
         this.fontColor = false;
       }
          if (this.inviteNewFriendToTheBudgetAndDisplayDescriptions.goal < this.TotalValue){
            this.fontColor = true;
           }else{
             this.fontColor = false;
           }
          this.ngOnInit();
        });

        // Use this mathod to refresh description.
  });

}
// Checks permission - if user have it - switch to budget settings
budgetSettings(): void{
  this.httpClient.checkPermission(sessionStorage.getItem('uniqueCode'), sessionStorage.getItem('nickname')).subscribe(data => {
    if (data.typeOfPermission > 1) {
      alert('You don not have permission');
    }else{
      this.router.navigate(['BudgetSettingsComponent']);
    }
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
    // Sets this object for method which can add new member.
    this.inviteNewFriendToTheBudgetAndDisplayDescriptions = uAtG;
   // let sizeBudgetArrayDisplay = 0;
    // usun const budgetArrayInsideThisMethod: Budget[] = [];
    // todo
    if (this.userVision){
      if (this.inviteNewFriendToTheBudgetAndDisplayDescriptions.goal < this.TotalValue){
        this.fontColor = true;
       }else{
         this.fontColor = false;
       }
      sessionStorage.setItem('uniqueCode', uAtG.uniqueGroupCode);
      if ( this.inviteNewFriendToTheBudgetAndDisplayDescriptions.expectedExpensesList !== null){
        let expectedExpensesTmp = 0;
        this.inviteNewFriendToTheBudgetAndDisplayDescriptions.expectedExpensesList.forEach(function(obj){
          console.log(obj.value);
          expectedExpensesTmp += obj.value;
        });
        this.expectedExpenses = expectedExpensesTmp;
      }
      // tslint:disable-next-line:prefer-for-of
      /* usun for (let i = 0; i < uAtG.budgetList.length; i++){
      if (uAtG.budgetName === uAtG.budgetList[i].budgetName) {
        budgetArrayInsideThisMethod[i - sizeBudgetArrayDisplay] = uAtG.budgetList[i];
      }else{
        sizeBudgetArrayDisplay++;
      }*/

      // usun this.budgetArray = budgetArrayInsideThisMethod;}

      let user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null, null);
      // let budgetArray3: Budget[] = [];

      // tslint:disable-next-line:max-line-length
      // I don't know how to give value to inviteNewFriendToTheBudgetAndDisplayDescriptions in IF STATEMENT so create this variable to get value.
      let uAsGobjForIfStatement: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null, null, null, null, null, null);
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
      let sum1 = 0;
      this.inviteNewFriendToTheBudgetAndDisplayDescriptions.budgetList.forEach(function(obj){
      sum1 += obj.value;
      });
      this.TotalValue = sum1;
      this.userVision = false;
   }else{
    this.userVision = true;
  }
  }
// tslint:disable-next-line:max-line-length
// When user click then method needs confirm. If Anser if TRUE then method will check the permission to do that. Method gets budget to delete
  deleteEntry(budget: Budget): void{
   const answer = window.confirm('Confirm');
   if (answer){
      this.TotalValue -= budget.value;
      this.httpClient.checkPermission(sessionStorage.getItem('uniqueCode'), sessionStorage.getItem('nickname')).subscribe(data => {
      if (data.typeOfPermission < 3 || budget.userName === sessionStorage.getItem('nickname')){
        this.httpClient.deleteEntry(budget, budget.id).subscribe(uasg => {
          this.inviteNewFriendToTheBudgetAndDisplayDescriptions = uasg;
          this.expectedExpenses = 0;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.inviteNewFriendToTheBudgetAndDisplayDescriptions.expectedExpensesList.length; i++){
        this.expectedExpenses += this.inviteNewFriendToTheBudgetAndDisplayDescriptions.expectedExpensesList[i].value;
      }
          this.TotalValue = 0;
      // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.inviteNewFriendToTheBudgetAndDisplayDescriptions.budgetList.length; i++){
            this.TotalValue += this.inviteNewFriendToTheBudgetAndDisplayDescriptions.budgetList[i].value;
      }
          if (this.inviteNewFriendToTheBudgetAndDisplayDescriptions.goal < this.TotalValue){
        this.fontColor = true;
       }else{
         this.fontColor = false;
       }
          if (this.inviteNewFriendToTheBudgetAndDisplayDescriptions.goal < this.TotalValue){
        this.fontColor = true;
       }else{
         this.fontColor = false;
       }
        });
      }else{
        alert('You do not have permission to do that');
      }
    });
  }
  }
  // tslint:disable-next-line:typedef
  deleteBudget(uasg: UserAssignmentToGroup){
    const answer = window.confirm('Confirm');
    this.httpClient.checkPermission(uasg.uniqueGroupCode, sessionStorage.getItem('nickname')).subscribe( permissionObj => {
      switch (answer){
        case true: {
      if (permissionObj.typeOfPermission === 1 && permissionObj.uniqueGroupCode === uasg.uniqueGroupCode){
        this.httpClient.deleteBudget(uasg).subscribe(data => {
          this.ngOnInit();
          window.location.reload();
        });
      }else{
         alert('You don not have permission to do that');
        }
      this.ngOnInit();
      window.location.reload();
      break;
      }
      }
     });
  }

     // Method get object uasg from button html and them create array only with this object.
     // After that create object user with ONLY user nickname and LIST with object uasg. In the end send user to leaveBudget method.
  leaveBudget(uasg: UserAssignmentToGroup): void{
      const user: User = new User(null, sessionStorage.getItem('nickname'), null, null, null, null, null, null, null);
      this.httpClient.findUser(user).subscribe(foundUser => {
        this.httpClient.leaveBudget(foundUser, uasg.uniqueGroupCode, 'checkIfNotLastWithPermOne').subscribe(refresh => {
          this.ngOnInit();
          window.location.reload();
        });
      });

    }

  refreshList(): void{
    this.ngOnInit();
    window.location.reload();
  }


}
