import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSummaryAdvertisementComponent } from './ai-summary-advertisement.component';

describe('AiSummaryAdvertisementComponent', () => {
  let component: AiSummaryAdvertisementComponent;
  let fixture: ComponentFixture<AiSummaryAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiSummaryAdvertisementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiSummaryAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
