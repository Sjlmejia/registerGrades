import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalGradeComponent } from './total-grade.component';

describe('TotalGradeComponent', () => {
  let component: TotalGradeComponent;
  let fixture: ComponentFixture<TotalGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
