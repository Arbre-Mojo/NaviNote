import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbsencesAndTardinessComponent } from './absences-and-tardiness.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AbsencesAndTardinessComponent', () => {
  let component: AbsencesAndTardinessComponent;
  let fixture: ComponentFixture<AbsencesAndTardinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsencesAndTardinessComponent, HttpClientTestingModule, RouterTestingModule],
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

    fixture = TestBed.createComponent(AbsencesAndTardinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
