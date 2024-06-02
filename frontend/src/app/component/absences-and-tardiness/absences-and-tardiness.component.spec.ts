import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesAndTardinessComponent } from './absences-and-tardiness.component';

describe('AbsencesAndTardinessComponent', () => {
  let component: AbsencesAndTardinessComponent;
  let fixture: ComponentFixture<AbsencesAndTardinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsencesAndTardinessComponent]
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
