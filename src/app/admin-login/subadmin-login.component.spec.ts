import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminLoginComponent } from './subadmin-login.component';

describe('SubadminLoginComponent', () => {
  let component: SubadminLoginComponent;
  let fixture: ComponentFixture<SubadminLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
