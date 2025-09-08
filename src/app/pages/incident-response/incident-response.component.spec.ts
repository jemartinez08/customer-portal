import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentResponseComponent } from './incident-response.component';

describe('IncidentResponseComponent', () => {
  let component: IncidentResponseComponent;
  let fixture: ComponentFixture<IncidentResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
