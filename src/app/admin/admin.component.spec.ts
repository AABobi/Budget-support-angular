import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientService, User } from '../services/http-client.service';
import { AdminComponent } from './admin.component';
import { HttpClient, HttpClientModule } from  '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('AdminComponent', () => {
  let service: HttpClientService;
  let admin: AdminComponent;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientService]
    });
    service = getTestBed().get(HttpClientService);
    httpMock = getTestBed().get(HttpTestingController);
    //httpClient = TestBed.inject(HttpClient);

  });

  it('aa', () => {
      expect(service).toBeTruthy();
  });

  it('aaaaaaaa', () => {
    let user: User = new User(null, 'qwe', null, null, null, null, null, null, null);
    service.findUser(user).subscribe(res => {
    expect(res.nickname).toBe('qwe');
    });

    //let req = httpMock.expectOne('http://localhost:8080/findUser');
    //expect(req.request.method).toBe('post');
    
  });


  /*beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });*/

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  /*it('should navigate to User Component', () => {
    export
  })*/
});
  /*beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ]
    })
    .compileComponents();
  }));
*/
