import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManeuverNavbarComponent } from './maneuver-navbar.component';

describe('ManeuverNavbarComponent', () => {
  let component: ManeuverNavbarComponent;
  let fixture: ComponentFixture<ManeuverNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManeuverNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManeuverNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
