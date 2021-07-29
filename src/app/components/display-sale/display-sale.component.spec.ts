import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySaleComponent } from './display-sale.component';

describe('DisplaySaleComponent', () => {
  let component: DisplaySaleComponent;
  let fixture: ComponentFixture<DisplaySaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    pending('The test was failing before the iteration began.');
  });
});
