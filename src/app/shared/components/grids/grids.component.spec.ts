import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GridsComponent } from './grids.component';

describe('GridsComponent', () => {
  let component: GridsComponent;
  let fixture: ComponentFixture<GridsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
