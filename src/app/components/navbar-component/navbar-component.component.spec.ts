import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponentComponent } from './navbar-component.component';

describe('NavbarComponentComponent', () => {
  let component: NavbarComponentComponent;
  let fixture: ComponentFixture<NavbarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
