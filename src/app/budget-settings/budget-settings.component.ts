import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientService, User, UserAssignmentToGroup, UserInBudget } from '../services/http-client.service';

@Component({
  selector: 'app-budget-settings',
  templateUrl: './budget-settings.component.html',
  styleUrls: ['./budget-settings.component.css']
})
export class BudgetSettingsComponent implements OnInit {


year: number;
month: string;
day: number;
years: number[] = [];
days: number[] = [];
months: string[] = [null, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
permission: number[] = [null, 1, 2, 3];
permissionChoosen: number;

yearEnd: number;
monthEnd: string;
dayEnd: number;
yearsEnd: number[] = [];
daysEnd: number[] = [];
monthsEnd: string[] = [null, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
options: string[] = [];
goalValue: number;
userAssignment: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null, null, null, null, null, null);
  constructor(public router: Router,
              public httpClient: HttpClientService,
              public loginService: AuthenticationService) { }

  ngOnInit(): void {
    // tslint:disable-next-line:max-line-length
    this.httpClient.findBudgetForListOfMembers(sessionStorage.getItem('uniqueCode'), sessionStorage.getItem('nickname')).subscribe(userAssignment => {
    this.userAssignment = userAssignment;
    });
    this.years.push(null);
    this.yearsEnd.push(null);
    for (let i = 2021; i < 2071; i++){
      this.years.push(i);
      this.yearsEnd.push(i);
    }

  }

  back(): void{
    sessionStorage.setItem('visionWhenGoBack', 'false');
    sessionStorage.setItem('doNgOnInit', 'yes');
    this.router.navigate(['UserComponent']);
  }


    setPermission(permissionType): void {
      this.permissionChoosen = permissionType;
    }

    confirmSetPermission(nicknameClass: UserInBudget): void {
    // tslint:disable-next-line:triple-equals
    if (this.permissionChoosen == 1 || this.permissionChoosen == 2 || this.permissionChoosen == 3){
      const answer = window.confirm('Confirm');
      const user: User = new User(null, nicknameClass.nickname, null, null, null, null, null, null, null);
      if (answer){
      this.httpClient.findUser(user).subscribe( foundUser => {
          this.httpClient.setPermission(foundUser, this.permissionChoosen, sessionStorage.getItem('uniqueCode')).subscribe(message => {
            alert(message);
          });
      });
    }
  }else{
    alert('Chose permission type');
  }
     }

     removeUserFromBudget(nicknameClass: UserInBudget): void{
      const findUserWithNick: User = new User(null, nicknameClass.nickname , null, null, null, null, null, null, null);
      this.httpClient.checkPermission(sessionStorage.getItem('uniqueCode'), nicknameClass.nickname).subscribe( perm => {
        console.log(perm.typeOfPermission);
        // tslint:disable-next-line:triple-equals
        if (perm.typeOfPermission == 1){
          alert('Cannot remove this user');
        }else{
          this.httpClient.findUser(findUserWithNick).subscribe(foudnUser => {
            this.httpClient.leaveBudget(foudnUser, sessionStorage.getItem('uniqueCode'), 'doNot').subscribe(refresh => {
              this.ngOnInit();
              window.location.reload();
            });
          });
        }
      });
     
     }
  setStartYear(year): void {
    this.year = year;
    if (this.month !== undefined){
      this.httpClient.countTheDays(this.year, this.month).subscribe( data => {
       this.days = data;
      });
    }
}

  setStartMonth(month): void {
    this.month = month;
    if (this.year !== undefined){
      this.httpClient.countTheDays(this.year, this.month).subscribe( data => {
        this.days = data;
      });
     }
  }

  setStartDay(day): void {
    this.day = day;
  }

  setStartYearEnd(yearEnd): void {
    this.yearEnd = yearEnd;
    if (this.monthEnd !== undefined){
      this.httpClient.countTheDays(this.yearEnd, this.monthEnd).subscribe( data => {
       this.daysEnd = data;
      });
    }
}

  setStartMonthEnd(monthEnd): void {
    this.monthEnd = monthEnd;
    if (this.yearEnd !== undefined){
      this.httpClient.countTheDays(this.yearEnd, this.monthEnd).subscribe( data => {
        this.daysEnd = data;
      });
     }
  }

  setStartDayEnd(dayEnd): void {
    this.dayEnd = dayEnd;
  }



  saveSettings(): void{
   // tslint:disable-next-line:no-construct
   const temporaryYearValue = new Number(this.year);
   // tslint:disable-next-line:no-construct
   const temporaryDayValue = new Number(this.day);
   let stringToCreateDateDay;
   let stringToCreateDateMonth;
   switch (this.day < 10){
  case true: {
    stringToCreateDateDay = '0'.concat(temporaryDayValue.toString());
    break;
  }
  case false: {
    stringToCreateDateDay = temporaryDayValue.toString();
  }
  }

   // tslint:disable-next-line:radix
   switch (parseInt(this.month) < 10){
    case true: {
      stringToCreateDateMonth = '0'.concat(this.month);
      break;
    }
    case false: {
      stringToCreateDateMonth = this.month;
    }
  }
   const startDate = temporaryYearValue.toString().concat('-').concat(stringToCreateDateMonth).concat('-').concat(stringToCreateDateDay);

  // tslint:disable-next-line:no-construct
   const temporaryYearValueEnd = new Number(this.yearEnd);
  // tslint:disable-next-line:no-construct
   const temporaryDayValueEnd = new Number(this.dayEnd);
   //alert(temporaryDayValueEnd); HERE IS OK
   let stringToCreateEndDateDay;
   let stringToCreateEndDateMonth;
   switch (this.dayEnd < 10){
  case true: {
    stringToCreateEndDateDay = '0'.concat(temporaryDayValueEnd.toString());
    break;
  }
  case false: {
    stringToCreateEndDateDay = temporaryDayValueEnd.toString();
  }
  }

   // tslint:disable-next-line:radix
   switch (parseInt(this.monthEnd) < 10){
    case true: {
      stringToCreateEndDateMonth = '0'.concat(this.monthEnd);
      break;
    }
    case false: {
      stringToCreateEndDateMonth = this.monthEnd;
    }
  }

 // tslint:disable-next-line:max-line-length
   const startDateEnd = temporaryYearValueEnd.toString().concat('-').concat(stringToCreateEndDateMonth).concat('-').concat(stringToCreateEndDateDay);
  
  // tslint:disable-next-line:max-line-length
   const userAssignemtToGroup: UserAssignmentToGroup = new UserAssignmentToGroup(null, null, null, null, sessionStorage.getItem('uniqueCode'), startDate, startDateEnd, this.goalValue, null);

   this.httpClient.saveBudgetSettings(userAssignemtToGroup).subscribe(data => {
    this.back();
  });
  }
}
