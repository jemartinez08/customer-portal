import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaSingleCardComponent } from './sla-single-card.component';

describe('SlaSingleCardComponent', () => {
  let component: SlaSingleCardComponent;
  let fixture: ComponentFixture<SlaSingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlaSingleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
