import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDropdownComponent } from './data-dropdown.component';

describe('DataDropdownComponent', () => {
  let component: DataDropdownComponent;
  let fixture: ComponentFixture<DataDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
