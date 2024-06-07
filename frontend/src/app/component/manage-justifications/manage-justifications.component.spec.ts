import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJustificationsComponent } from './manage-justifications.component';
import {adminCategory} from "../../../service/user/userCategories";
import {of, throwError} from "rxjs";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManageJustificationsComponent', () => {
  let component: ManageJustificationsComponent;
  let fixture: ComponentFixture<ManageJustificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageJustificationsComponent, HttpClientTestingModule, RouterTestingModule],
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

    fixture = TestBed.createComponent(ManageJustificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user by token on init', async () => {
    const initializeUserByTokenSpy = spyOn(component, 'initializeUserByToken').and.returnValue(Promise.resolve(true));
    await component.ngOnInit();
    expect(initializeUserByTokenSpy).toHaveBeenCalled();
  });

  it('should navigate to specific user page on init', async () => {
    const specificUserPageSpy = spyOn(component, 'specificUserPage').and.returnValue(Promise.resolve(true));
    await component.ngOnInit();
    expect(specificUserPageSpy).toHaveBeenCalledWith(adminCategory);
  });

  it('should fetch all justifications on init', async () => {
    const getAllEntitiesSpy = spyOn(component.justificationService, 'getAllEntities').and.returnValue(of([]));
    await component.ngOnInit();
    expect(getAllEntitiesSpy).toHaveBeenCalled();
  });

  it('should initialize users profile picture and justification images on init', async () => {
    const initializeUsersPfpImgUrlSpy = spyOn(component, 'initializeUsersPfpImgUrl').and.returnValue(Promise.resolve(true));
    const initializeJustificationImagesSpy = spyOn(component, 'initializeJustificationImages').and.returnValue(Promise.resolve(true));
    await component.ngOnInit();
    expect(initializeUsersPfpImgUrlSpy).toHaveBeenCalled();
    expect(initializeJustificationImagesSpy).toHaveBeenCalled();
  });

  it('should handle error when fetching justifications fails', async () => {
    spyOn(console, 'error');
    spyOn(component.justificationService, 'getAllEntities').and.returnValue(throwError('error'));
    await component.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('error');
  });
});
