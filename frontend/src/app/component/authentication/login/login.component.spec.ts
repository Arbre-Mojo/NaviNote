import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import {studentCategory} from "../../../../service/user/userCategories";
import {Router} from "@angular/router";
import '../../main/main.component.css';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
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

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate form when email is empty', () => {
    component.emailInput = '';
    component.passwordInput = 'password';
    expect(component.isFormValid()).toBe(false);
  });

  it('should invalidate form when password is empty', () => {
    component.emailInput = 'test@example.com';
    component.passwordInput = '';
    expect(component.isFormValid()).toBe(false);
  });

  it('should invalidate email when it is not proper', () => {
    component.emailInput = 'invalidEmail';
    expect(component.isEmailValid()).toBe(false);
  });

  it('should validate email when it is proper', () => {
    component.emailInput = 'test@example.com';
    expect(component.isEmailValid()).toBe(true);
  });

  it('should not switch user category when current category is not student', () => {
    spyOn(component, 'isStudentCategory').and.returnValue(false);
    spyOn(component, 'setCurrentUserCategory');
    component.switchUserCategory();
    expect(component.setCurrentUserCategory).toHaveBeenCalledWith(studentCategory);
  });
});
