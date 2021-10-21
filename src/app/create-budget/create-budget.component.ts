import { Component, OnInit } from '@angular/core';
import { Budget, HttpClientService, List, User, UserAssignmentToGroup } from '../services/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.css']
})
export class CreateBudgetComponent implements OnInit {

  groupName: string;
  constructor(
    public httpClient: HttpClientService,
    public router: Router) { }

  ngOnInit(): void {
  }


  createNewBudget(): void{
    alert('test');
    const arrayWithInformationAboutNewBudget: string[] = [];
    console.log(this.groupName);
    arrayWithInformationAboutNewBudget.push(this.groupName);
    arrayWithInformationAboutNewBudget.push(sessionStorage.getItem('nickname'));
    this.httpClient.createBudget(arrayWithInformationAboutNewBudget).subscribe();
 }
}
