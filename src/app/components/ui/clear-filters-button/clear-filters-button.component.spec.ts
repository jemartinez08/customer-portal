import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearFiltersButtonComponent } from './clear-filters-button.component';

describe('ClearFiltersButtonComponent', () => {
  let component: ClearFiltersButtonComponent;
  let fixture: ComponentFixture<ClearFiltersButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearFiltersButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearFiltersButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
