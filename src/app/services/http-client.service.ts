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


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  tmp = 0;
  constructor(
    private httpClient: HttpClient
  ) { }

  // tslint:disable-next-line:typedef
  public firstConnection(){
    return this.httpClient.get<User>('http://localhost:8080//firstConn');
  }

  public checkLogin(user): Observable<User>{
    return this.httpClient.post<User>('http://localhost:8080//checkLogin', user);
  }
}
