import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdrCrowdstrikeSentineloneComponent } from './edr-crowdstrike-sentinelone.component';

describe('EdrCrowdstrikeSentineloneComponent', () => {
  let component: EdrCrowdstrikeSentineloneComponent;
  let fixture: ComponentFixture<EdrCrowdstrikeSentineloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdrCrowdstrikeSentineloneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdrCrowdstrikeSentineloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
