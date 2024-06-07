import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SubjectWrapperElementComponent } from './subject-wrapper-element.component';

describe('SubjectWrapperElementComponent', () => {
  let component: SubjectWrapperElementComponent;
  let fixture: ComponentFixture<SubjectWrapperElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectWrapperElementComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '123', // represents the 'id' param in route
              },
            },
          },
        },
      ],
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
