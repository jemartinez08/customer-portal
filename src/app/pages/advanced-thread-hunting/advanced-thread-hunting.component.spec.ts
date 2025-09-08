import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedThreadHuntingComponent } from './advanced-thread-hunting.component';

describe('AdvancedThreadHuntingComponent', () => {
  let component: AdvancedThreadHuntingComponent;
  let fixture: ComponentFixture<AdvancedThreadHuntingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedThreadHuntingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedThreadHuntingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
