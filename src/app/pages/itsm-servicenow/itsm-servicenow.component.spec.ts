import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsmServicenowComponent } from './itsm-servicenow.component';

describe('ItsmServicenowComponent', () => {
  let component: ItsmServicenowComponent;
  let fixture: ComponentFixture<ItsmServicenowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItsmServicenowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItsmServicenowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
