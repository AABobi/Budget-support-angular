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
 public email: string;
 public lastname: string;
 public permissions: string;

 constructor(id: number, nickname: string, name: string, email: string, lastname: string, permissions: string){
    this.id = id;
    this.nickname = nickname;
    this.name = name;
    this.email = email;
    this.lastname = lastname;
    this.permissions = permissions;
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
}
