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
 public permissions: string;
 public password: Password;

 constructor(id: number, nickname: string, name: string, lastname: string, email: string , permissions: string, password: Password){
    this.id = id;
    this.nickname = nickname;
    this.name = name;
    this.email = email;
    this.lastname = lastname;
    this.permissions = permissions;
    this.password = password;
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
  public groupName: string;
  public user: User;

 constructor(id: number, description: string, uniqueGroupCode: string, groupName: string, user: User){
    this.id = id;
    this.description = description;
    this.uniqueGroupCode = uniqueGroupCode;
    this.groupName = groupName;
    this.user = user;
 }
}

export class UserAssignmentToGroup{
  public id: number;
  public budgetList: Array<Budget>;
  public user: User;
  public budgetName: string;
  public uniqueGroupCode: string;

  constructor(id: number, budgetList: Array<Budget>, user: User, budgetName: string, uniqueGroupCode: string){
   this.id = id;
   this.budgetList = budgetList;
   this.user = user;
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
  public firstConnection() {
    return this.httpClient.get<User>('http://localhost:8080//firstConn');
  }

  public findAllBudgetsOfUser(user): Observable<UserAssignmentToGroup[]>{
    return this.httpClient.post<UserAssignmentToGroup[]>('http://localhost:8080/findAllBudgetsOfUser', user);
   }
}
