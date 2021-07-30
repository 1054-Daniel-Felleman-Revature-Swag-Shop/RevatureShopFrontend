import { Component, OnInit } from '@angular/core';
import { DisplayFeaturedService } from 'src/app/services/display-featured.service';
import { InventoryItem, InventoryItemsService } from 'src/app/services/inventory-items.service';
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  itemImagesURL : string = "https://rss-images.s3.us-east-2.amazonaws.com";


  featuredcategoryOfItems : string = 'Featured Items';
  featuredItemsFiltered : InventoryItem[] = [];

  featuredcurrentPage = 1;
  featureditemsPerPage = 3;
  featuredpageSize: number = 0;

  featuredselectedItem : InventoryItem = new InventoryItem(1,"",1,1, "", "", "", 0);
  featuredinStockChecked : boolean = true;


  featuredsearchText='';


  constructor(
    private _featuredItemsService: InventoryItemsService,
    private displayFeaturedService : DisplayFeaturedService) {

   }

  ngOnInit(): void {

    this.fetchfeaturedItemListByCategory();
  }


  get featuredItemsService() {
    return this._featuredItemsService;
  }

  fetchfeaturedItemListByCategory() {

    this.displayFeaturedService.getInventoryItemsByFeatured().subscribe(
      itemsList => {
        this._featuredItemsService.inventoryItems = itemsList;
        console.log(itemsList)
        this.filterfeaturedListByStock();
      }
    )
  }

  featureditemClicked(selectedItem : InventoryItem) {
    this.featuredselectedItem = selectedItem;

  }

  filterfeaturedListByStock() {

    this.featuredItemsFiltered = this._featuredItemsService.inventoryItems.filter(element => {
      return (this.featuredinStockChecked && element.quantity > 0);
  });

  }

  public featuredonPageChange(pageNum: number): void {
    this.featuredpageSize = this.featureditemsPerPage*(pageNum - 1);
  }

  public featuredchangePagesize(num: number): void {
  this.featureditemsPerPage = this.featuredpageSize + num;
}

}
