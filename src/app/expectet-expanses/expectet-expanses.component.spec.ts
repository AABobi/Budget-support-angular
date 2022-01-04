import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectetExpansesComponent } from './expectet-expanses.component';

describe('ExpectetExpansesComponent', () => {
  let component: ExpectetExpansesComponent;
  let fixture: ComponentFixture<ExpectetExpansesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpectetExpansesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectetExpansesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
