import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAnalysisComponent } from './ticket-analysis.component';

describe('TicketAnalysisComponent', () => {
  let component: TicketAnalysisComponent;
  let fixture: ComponentFixture<TicketAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
