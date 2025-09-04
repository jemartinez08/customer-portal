import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalThreadsComponent } from './critical-threads.component';

describe('CriticalThreadsComponent', () => {
  let component: CriticalThreadsComponent;
  let fixture: ComponentFixture<CriticalThreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriticalThreadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriticalThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
