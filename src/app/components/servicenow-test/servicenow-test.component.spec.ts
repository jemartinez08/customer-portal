import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicenowTestComponent } from './servicenow-test.component';

describe('ServicenowTestComponent', () => {
  let component: ServicenowTestComponent;
  let fixture: ComponentFixture<ServicenowTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicenowTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicenowTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
