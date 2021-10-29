import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
 public permission: Array<Permission>;

 constructor(id: number, nickname: string, name: string, lastname: string, email: string,
             password: Password, userAssinmentToGroup: Array<UserAssignmentToGroup>, permission: Array<Permission>){
    this.id = id;
    this.nickname = nickname;
    this.name = name;
    this.email = email;
    this.lastname = lastname;
    this.permission = permission;
    this.password = password;
    this.userAssignmentToGroup = userAssinmentToGroup;
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
  public uniqueGroupCode: string;
  public budgetName: string;
  public userName: string;

 constructor(id: number, description: string, uniqueGroupCode: string, budgetName: string, userName: string){
    this.id = id;
    this.description = description;
    this.uniqueGroupCode = uniqueGroupCode;
    this.budgetName = budgetName;
    this.userName = userName;
 }
}

export class Permission{
  public id: number;
  public uniqueGroupCode: string;

  constructor(id: number, uniqueGroupCode: string){
    this.id = id;
    this.uniqueGroupCode = uniqueGroupCode;

  }

}
export class UserAssignmentToGroup{
  public id: number;
  public budgetList: Array<Budget>;
  public budgetName: string;
  public uniqueGroupCode: string;

  constructor(id: number, budgetList: Array<Budget>, budgetName: string, uniqueGroupCode: string){
   this.id = id;
   this.budgetList = budgetList;
   this.budgetName = budgetName;
   this.uniqueGroupCode = uniqueGroupCode;
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

  public createBudget(array): Observable<null>{
       return this.httpClient.post<null>('http://localhost:8080//createBudget', array);
  }

  // try change to get soon
  public checkLogin(user): Observable < User > {
    return this.httpClient.post<User>('http://localhost:8080//checkLogin', user);
  }

// tslint:disable-next-line:typedef
public deleteBudget(uniqueGroupCode){
  return this.httpClient.delete<null>('http://localhost:8080//deleteBudget' + '/' + uniqueGroupCode);
}

  // tslint:disable-next-line:typedef
  public firstConnection() {
    return this.httpClient.get<User>('http://localhost:8080//firstConn');
  }

  public findAllBudgetsOfUser(user): Observable<User>{
    return this.httpClient.post<User>('http://localhost:8080/findAllBudgetsOfUser', user);
   }
}
