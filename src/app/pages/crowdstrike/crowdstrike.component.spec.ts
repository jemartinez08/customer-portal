import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdstrikeComponent } from './crowdstrike.component';

describe('CrowdstrikeComponent', () => {
  let component: CrowdstrikeComponent;
  let fixture: ComponentFixture<CrowdstrikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrowdstrikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrowdstrikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
