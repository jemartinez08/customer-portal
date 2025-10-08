import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaCardComponent } from './sla-card.component';

describe('SlaCardComponent', () => {
  let component: SlaCardComponent;
  let fixture: ComponentFixture<SlaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
