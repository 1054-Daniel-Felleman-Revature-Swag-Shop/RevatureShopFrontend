import { Component } from '@angular/core';
import { DisplayPopularComponent } from '../display-popular/display-popular.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent{
  constructor(private popularItems: DisplayPopularComponent) {}

  numItems = this.popularItems.popularItemsService.inventoryItems.length;
}
