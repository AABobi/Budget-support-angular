import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService, User } from '../services/http-client.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements  OnInit  {
 constructor(private httpClient: HttpClientService){

 }
 arrayOfUsers: User[];
  ngOnInit(): void {
    this.httpClient.findAll().subscribe(req => {
     this.arrayOfUsers = req;
    });
  }



}

