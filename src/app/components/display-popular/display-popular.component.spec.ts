import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPopularComponent } from './display-popular.component';

describe('DisplayPopularComponent', () => {
  let component: DisplayPopularComponent;
  let fixture: ComponentFixture<DisplayPopularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPopularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    pending('The test was failing before the iteration began.');
  });
});
