import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConnectionSecurityElementComponent } from './connection-security-element.component';

describe('ConnectionSecurityElementComponent', () => {
  let component: ConnectionSecurityElementComponent;
  let fixture: ComponentFixture<ConnectionSecurityElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionSecurityElementComponent, HttpClientTestingModule, RouterTestingModule],
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

    fixture = TestBed.createComponent(ConnectionSecurityElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
