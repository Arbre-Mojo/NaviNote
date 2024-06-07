import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserElementComponent } from './user-element.component';

describe('UserElementComponent', () => {
  let component: UserElementComponent;
  let fixture: ComponentFixture<UserElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserElementComponent, HttpClientTestingModule, RouterTestingModule],
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

    fixture = TestBed.createComponent(UserElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
