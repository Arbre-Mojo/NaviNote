import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileMenuItemComponent } from './profile-menu-item.component';

describe('ProfileMenuItemComponent', () => {
  let component: ProfileMenuItemComponent;
  let fixture: ComponentFixture<ProfileMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMenuItemComponent, HttpClientTestingModule, RouterTestingModule],
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
        {
          provide: 'allowedUserCategories', // replace 'allowedUserCategories' with the actual token if it's not a string
          useValue: [], // provide the mock value
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
