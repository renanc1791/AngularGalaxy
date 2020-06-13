import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDeleteModalComponent } from './instructor-delete-modal.component';

describe('InstructorDeleteModalComponent', () => {
  let component: InstructorDeleteModalComponent;
  let fixture: ComponentFixture<InstructorDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
