import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJustificationModalComponent } from './add-justification-modal.component';

describe('AddJustificationModalComponent', () => {
  let component: AddJustificationModalComponent;
  let fixture: ComponentFixture<AddJustificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJustificationModalComponent]
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
