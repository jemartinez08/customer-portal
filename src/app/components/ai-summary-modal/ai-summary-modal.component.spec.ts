import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSummaryModalComponent } from './ai-summary-modal.component';

describe('AiSummaryModalComponent', () => {
  let component: AiSummaryModalComponent;
  let fixture: ComponentFixture<AiSummaryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiSummaryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiSummaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
