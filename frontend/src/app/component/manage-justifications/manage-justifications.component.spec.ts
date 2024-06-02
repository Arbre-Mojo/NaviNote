import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJustificationsComponent } from './manage-justifications.component';

describe('ManageJustificationsComponent', () => {
  let component: ManageJustificationsComponent;
  let fixture: ComponentFixture<ManageJustificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageJustificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageJustificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
