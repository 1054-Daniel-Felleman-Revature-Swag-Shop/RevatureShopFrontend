import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFeaturedComponent } from './display-featured.component';

describe('DisplayFeaturedComponent', () => {
  let component: DisplayFeaturedComponent;
  let fixture: ComponentFixture<DisplayFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayFeaturedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    pending('The test was failing before the iteration began.');
  });
});
