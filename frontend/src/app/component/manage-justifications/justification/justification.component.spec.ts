import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JustificationComponent } from './justification.component';

describe('JustificationComponent', () => {
  let component: JustificationComponent;
  let fixture: ComponentFixture<JustificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustificationComponent, HttpClientTestingModule, RouterTestingModule],
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
          provide: 'justificationImageList', // replace 'justificationImageList' with the actual token if it's not a string
          useValue: [], // provide the mock value
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
