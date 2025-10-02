import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSlaComplianceComponent } from './project-sla-compliance.component';

describe('ProjectSlaComplianceComponent', () => {
  let component: ProjectSlaComplianceComponent;
  let fixture: ComponentFixture<ProjectSlaComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSlaComplianceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSlaComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
