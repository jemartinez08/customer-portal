import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedbarsComponent } from './stackedbars.component';

describe('StackedbarsComponent', () => {
  let component: StackedbarsComponent;
  let fixture: ComponentFixture<StackedbarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedbarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
