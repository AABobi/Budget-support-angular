import { Component, OnInit } from '@angular/core';

import { HttpClientService, User } from '../services/http-client.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public httpClient: HttpClientService) { }

  ngOnInit(): void {
  }

}
