import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplunkComponent } from './splunk.component';

describe('SplunkComponent', () => {
  let component: SplunkComponent;
  let fixture: ComponentFixture<SplunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplunkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
