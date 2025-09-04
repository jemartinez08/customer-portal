import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicenowComponent } from './servicenow.component';

describe('ServicenowComponent', () => {
  let component: ServicenowComponent;
  let fixture: ComponentFixture<ServicenowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicenowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicenowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
