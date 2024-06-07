import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PartnerSelectionComponent } from './partner-selection.component';
import {Router} from "@angular/router";
import {userCategories} from "../../../../service/user/userCategories";

describe('PartnerSelectionComponent', () => {
  let component: PartnerSelectionComponent;
  let fixture: ComponentFixture<PartnerSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerSelectionComponent, HttpClientTestingModule, RouterTestingModule],
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

    fixture = TestBed.createComponent(PartnerSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
