import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterElementComponent } from './register-element.component';

describe('RegisterElementComponent', () => {
  let component: RegisterElementComponent;
  let fixture: ComponentFixture<RegisterElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterElementComponent, HttpClientTestingModule, RouterTestingModule],
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

    fixture = TestBed.createComponent(RegisterElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
