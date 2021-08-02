import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPreviousOrdersComponent } from './view-previous-orders.component';

describe('ViewPreviousOrdersComponent', () => {
  let component: ViewPreviousOrdersComponent;
  let fixture: ComponentFixture<ViewPreviousOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPreviousOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPreviousOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
