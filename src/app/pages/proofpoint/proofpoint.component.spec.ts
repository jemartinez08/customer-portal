import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofpointComponent } from './proofpoint.component';

describe('ProofpointComponent', () => {
  let component: ProofpointComponent;
  let fixture: ComponentFixture<ProofpointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProofpointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProofpointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
