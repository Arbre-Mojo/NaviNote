import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectWrapperElementComponent } from './subject-wrapper-element.component';

describe('SubjectWrapperElementComponent', () => {
  let component: SubjectWrapperElementComponent;
  let fixture: ComponentFixture<SubjectWrapperElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectWrapperElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectWrapperElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
