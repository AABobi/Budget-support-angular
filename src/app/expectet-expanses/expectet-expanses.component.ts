import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs/operators';
import { Budget, ExpectedExpenses } from '../services/http-client.service';
import { Router } from '@angular/router';
import { HttpClientService, UserAssignmentToGroup } from '../services/http-client.service';

@Component({
  selector: 'app-expectet-expanses',
  templateUrl: './expectet-expanses.component.html',
  styleUrls: ['./expectet-expanses.component.css']
})
export class ExpectetExpansesComponent implements OnInit {
  [x: string]: any;
  value: number;
  description: string;
  date: string;

 expectedList: ExpectedExpenses[] = [];
 // tslint:disable-next-line:max-line-length
 userAssignmentToGroup: UserAssignmentToGroup = new UserAssignmentToGroup(null, this.expectedList, null, null, null, null, null, null, null);

  year: number;
month: string;
day: number;
years: number[] = [];
days: number[] = [];
months: string[] = [null, '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  constructor(public httpClient: HttpClientService,
              private router: Router) { }


  ngOnInit(): void {
    console.log(sessionStorage.getItem('uniqueCode'));
    this.httpClient.findBudget(sessionStorage.getItem('uniqueCode')).subscribe(data => {
      this.userAssignmentToGroup = data;
      console.log(data);
    });
    this.years.push(null);
    for (let i = 2021; i < 2071; i++){
      this.years.push(i);
    }
  }

  addExpectedExpanses(): void{
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
    // tslint:disable-next-line:max-line-length
    const expectedDate = temporaryYearValue.toString().concat('-').concat(stringToCreateDateMonth).concat('-').concat(stringToCreateDateDay);
    // tslint:disable-next-line:max-line-length
    const expectedExpenses: ExpectedExpenses = new ExpectedExpenses(null, this.description, this.value, sessionStorage.getItem('uniqueCode'), null, sessionStorage.getItem('nickname'), expectedDate);
 
    this.httpClient.addExpectedExpanses(expectedExpenses).subscribe( refresg => {
      this.refreshList();
    });
   }

   addToDiscriptions(ex: ExpectedExpenses): void{
     this.httpClient.addExpectedExpensesToTheDescription(ex, sessionStorage.getItem('nickname')).subscribe(refresh => {
       this.ngOnInit();
       window.location.reload();
     });
   }

   back(): void{
    sessionStorage.setItem('visionWhenGoBack', 'false');
    sessionStorage.setItem('doNgOnInit', 'yes');
    this.router.navigate(['UserComponent']);
  }


  deleteEntry(bud: ExpectedExpenses): void{
   this.httpClient.deleteExpectedEntry(bud.id, bud.uniqueGroupCode).subscribe( data => {
      this.userAssignmentToGroup = data;
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



  refreshList(): void{
    this.ngOnInit();
    window.location.reload();
  }
}
