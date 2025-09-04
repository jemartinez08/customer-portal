import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocSplunkComponent } from './soc-splunk.component';

describe('SocSplunkComponent', () => {
  let component: SocSplunkComponent;
  let fixture: ComponentFixture<SocSplunkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocSplunkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocSplunkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
