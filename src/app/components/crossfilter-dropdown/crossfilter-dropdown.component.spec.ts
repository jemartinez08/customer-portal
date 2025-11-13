import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossfilterDropdownComponent } from './crossfilter-dropdown.component';

describe('CrossfilterDropdownComponent', () => {
  let component: CrossfilterDropdownComponent;
  let fixture: ComponentFixture<CrossfilterDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossfilterDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossfilterDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
