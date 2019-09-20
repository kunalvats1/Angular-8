import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditviewComponent } from './editview.component';

describe('EditviewComponent', () => {
  let component: EditviewComponent;
  let fixture: ComponentFixture<EditviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
