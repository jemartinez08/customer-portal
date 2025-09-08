import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLinechartComponent } from './custom-linechart.component';

describe('CustomLinechartComponent', () => {
  let component: CustomLinechartComponent;
  let fixture: ComponentFixture<CustomLinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomLinechartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
