import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { UrlSerializer } from '@angular/router';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { identifierModuleUrl } from '@angular/compiler';

export class User{
 public id: number;
 public nickname: string;
 public name: string;
 public lastname: string;
 public email: string;
 public password: Password;
 public userAssignmentToGroup: Array<UserAssignmentToGroup>;
 public history: Array<History>;
 public permission: Array<Permission>;
 public confirm: boolean;
 public role: string;

 constructor(id: number, nickname: string, name: string, lastname: string, email: string,
             password: Password, userAssinmentToGroup: Array<UserAssignmentToGroup>, permission: Array<Permission>, confirm: boolean){
    this.id = id;
    this.nickname = nickname;
    this.name = name;
    this.email = email;
    this.lastname = lastname;
    this.permission = permission;
    this.password = password;
    this.userAssignmentToGroup = userAssinmentToGroup;
    this.confirm = confirm;
  }

}

export class Password{
  public id: number;
  public password: string;

  constructor(id: number, password: string){
    this.id = id;
    this.password = password;
 }
}

export class Budget{
  public id: number;
  public description: string;
  public value: number;
  public uniqueGroupCode: string;
  public date: string;
  public budgetName: string;
  public userName: string;

 constructor(id: number, description: string, value: number, uniqueGroupCode: string, budgetName: string, userName: string, date: string){
    this.id = id;
    this.description = description;
    this.value = value;
    this.uniqueGroupCode = uniqueGroupCode;
    this.date = date;
    this.budgetName = budgetName;
    this.userName = userName;
 }
}

export class ExpectedExpenses{
  public id: number;
  public description: string;
  public value: number;
  public uniqueGroupCode: string;
  public date: string;
  public budgetName: string;
  public userName: string;

 constructor(id: number, description: string, value: number, uniqueGroupCode: string, budgetName: string, userName: string, date: string){
    this.id = id;
    this.description = description;
    this.value = value;
    this.uniqueGroupCode = uniqueGroupCode;
    this.date = date;
    this.budgetName = budgetName;
    this.userName = userName;
 }
}

export class Permission{
  public id: number;
  public uniqueGroupCode: string;
  public typeOfPermission: number;

  constructor(id: number, uniqueGroupCode: string, typeOfPermission: number){
    this.id = id;
    this.uniqueGroupCode = uniqueGroupCode;
    this.typeOfPermission = typeOfPermission;

  }

}
export class UserAssignmentToGroup{
  public id: number;
  public expectedExpensesList: Array<ExpectedExpenses>;
  public budgetList: Array<Budget>;
  public budgetName: string;
  public uniqueGroupCode: string;
  public budgetStartDate: string;
  public budgetEndDate: string;
  public goal: number;
  public listOfMembers: Array<UserInBudget>;

  // tslint:disable-next-line:max-line-length
  constructor(id: number, expectedExpensesList: Array<ExpectedExpenses>, budgetList: Array<Budget>, budgetName: string, uniqueGroupCode: string, budgetStartDate: string, budgetEndDate: string, goal: number, listOfMembers: Array<UserInBudget>){
   this.id = id;
   this.expectedExpensesList = expectedExpensesList;
   this.budgetList = budgetList;
   this.budgetName = budgetName;
   this.uniqueGroupCode = uniqueGroupCode;
   this.budgetStartDate = budgetStartDate;
   this.budgetEndDate = budgetEndDate;
   this.goal = goal;
   this.listOfMembers = listOfMembers;
  }
}

export class History{
  public id: number;
  public budgetList: Array<Budget>;
  public budgetName: string;
  public uniqueGroupCode: string;
  public budgetStartDate: string;
  public budgetEndDate: string;
  public goalResult: number;
  public listOfMembers: Array<UserInBudget>;

  constructor(){
  }
}
export class UserInBudget{
    public id: number;
    public nickname: string;

    constructor(id: number, nickname: string){
    this.id = id;
    this.nickname = nickname;
    }
  }









export class List<T> {
  private items: Array<T>;

  constructor() {
      this.items = [];
  }

  size(): number {
      return this.items.length;
  }

  add(value: T): void {
      this.items.push(value);
  }

  get(index: number): T {
      return this.items[index];
  }
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  tmp = 0;
  constructor(
    private httpClient: HttpClient
  ) { }

public test(nick: string): Observable<Object>{
  return this.httpClient.get('http://localhost:8080//zob' + '/' + nick);
}

public test2(nick: string): Observable<Object>{
  return this.httpClient.get('http://localhost:8080//zob2' + '/' + nick);
}

public addExpectedExpensesToTheDescription(ExpectedObj, nickname){
  return this.httpClient.post('http://localhost:8080//addExpectedExpensesToDescription/' + nickname, ExpectedObj);
}

public addExpectedExpanses(uatg){
  return this.httpClient.post<null>('http://localhost:8080//addExpectedExpanses', uatg);
}
  
// tslint:disable-next-line:typedef
public addNewMemberToTheBudget(user, code){
  return this.httpClient.post<string[]>('http://localhost:8080//addNewMemberToTheBudget/' + code, user);
}

// tslint:disable-next-line:typedef
public addDescriptionToTheBudget(user){
  return this.httpClient.post<UserAssignmentToGroup>('http://localhost:8080//addDescriptionToTheBudget', user);
}

// tslint:disable-next-line:typedef
public countTheDays(year, month){
return this.httpClient.get<Array<number>>('http://localhost:8080//countTheDays/' + year + '&' + month);
}
public createBudget(array): Observable<null>{
     return this.httpClient.post<null>('http://localhost:8080//createBudget', array);
 }

public createFastTwojAccount(){
  return this.httpClient.post('http://localhost:8080//createFastTwojAccount', null);
}

public createUser(user){
  return this.httpClient.post<string[]>('http://localhost:8080//createUser', user);
}

public confirmUser(confirm){
  return this.httpClient.put('http://localhost:8080//confirmUser', confirm);
}
public checkPermission(uniqueCode, nickname){
   return this.httpClient.get<Permission>('http://localhost:8080//checkPermission' + '/' + uniqueCode + '&' + nickname);
}
// try change to get soon
public checkLogin(user): Observable < User > {
   return this.httpClient.post<User>('http://localhost:8080//checkLogin', user);
}

// tslint:disable-next-line:typedef
public deleteBudget(uatg){
  return this.httpClient.post('http://localhost:8080//deleteBudget', uatg);
}

// tslint:disable-next-line:typedef
public deleteEntry(budget, budgetId){
  return this.httpClient.post<UserAssignmentToGroup>('http://localhost:8080//deleteEntry/' + budgetId, budget);
}

// tslint:disable-next-line:typedef
public deleteEntryHistory(budget, budgetId){
  return this.httpClient.post<UserAssignmentToGroup>('http://localhost:8080//deleteEntryHistory/' + budgetId, budget);
}

public deleteExpectedEntry(id, code){
  return this.httpClient.delete<UserAssignmentToGroup>('http://localhost:8080//deleteExpectedEntry' + '/' + id + '&' + code);
}

public deleteHistoryEntry(historyObj, nickname){
  return this.httpClient.post<Array<History>>('http://localhost:8080//deleteHistoryEntry/' + nickname, historyObj);
}

  // tslint:disable-next-line:typedef
public firstConnection() {
  return this.httpClient.get<User>('http://localhost:8080//firstConn');
}

  // tslint:disable-next-line:typedef
public findUser(user){
  return this.httpClient.get<User>('http://localhost:8080//findUser/'+ user);
}

public findAll(){
  return this.httpClient.get<User[]>('http://localhost:8080//findAll');
}

public findEmail(email){
  return this.httpClient.get<string[]>('http://localhost:8080//findEmail/' + email);
}
public findAllBudgetsOfUser(user): Observable<User>{
  return this.httpClient.post<User>('http://localhost:8080//findAllBudgetsOfUser', user);
}

// tslint:disable-next-line:typedef
public findBudget(path) {
  return this.httpClient.get<UserAssignmentToGroup>('http://localhost:8080//findBudget' + '/' + path);
}

public findBudgetForListOfMembers(code, nickname): Observable<UserAssignmentToGroup>{
  return this.httpClient.get<UserAssignmentToGroup>('http://localhost:8080//findBudgetForListOfMembers/' + code + '&' + nickname);
}

// tslint:disable-next-line:typedef
public leaveBudget(user, code){
  // tslint:disable-next-line:max-line-length
  return this.httpClient.post<null>('http://localhost:8080//leaveTheGroup/' + code , user);
}

public moveGroupToTheHistory(group): Observable<User>{
  return this.httpClient.post<User>('http://localhost:8080/moveGroupToTheHistory', group);
}

public saveBudgetSettings(uatg){
  return this.httpClient.post<null>('http://localhost:8080//saveBudgetSettings', uatg);
}

public setRemoveButtonPermission(budgetsArray, user){
  return this.httpClient.post<Array<Array<any>>>('http://localhost:8080//setRemoveButtonPermission/' + user, budgetsArray);
}

// tslint:disable-next-line:typedef
public setPermission(user, permissionType, code){
  // tslint:disable-next-line:ban-types
  return this.httpClient.put<null>('http://localhost:8080//setPermission/' + permissionType + '&' + code, user );
}
}
