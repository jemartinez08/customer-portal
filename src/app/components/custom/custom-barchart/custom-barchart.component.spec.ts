import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBarchartComponent } from './custom-barchart.component';

describe('CustomBarchartComponent', () => {
  let component: CustomBarchartComponent;
  let fixture: ComponentFixture<CustomBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomBarchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
