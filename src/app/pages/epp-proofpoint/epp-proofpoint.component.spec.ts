import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EppProofpointComponent } from './epp-proofpoint.component';

describe('EppProofpointComponent', () => {
  let component: EppProofpointComponent;
  let fixture: ComponentFixture<EppProofpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EppProofpointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EppProofpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
