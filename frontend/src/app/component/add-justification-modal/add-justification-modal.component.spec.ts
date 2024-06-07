import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AddJustificationModalComponent } from './add-justification-modal.component';

describe('AddJustificationModalComponent', () => {
  let component: AddJustificationModalComponent;
  let fixture: ComponentFixture<AddJustificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJustificationModalComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1,
              },
            },
          },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJustificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
