import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainportalComponent } from './mainportal.component';

describe('MainportalComponent', () => {
  let component: MainportalComponent;
  let fixture: ComponentFixture<MainportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainportalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
