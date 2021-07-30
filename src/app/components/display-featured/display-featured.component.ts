import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem, InventoryItemsService } from '../../services/inventory-items.service'
import { DisplayFeaturedService } from '../../services/display-featured.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-display-featured',
  templateUrl: './display-featured.component.html',
  styleUrls: ['./display-featured.component.css']
})
export class DisplayFeaturedComponent implements OnInit {

  featureditemImagesURL : string = "https://revature-swag-shop-images.s3.us-east-2.amazonaws.com";

  featuredcategoryOfItems : string = 'Featured Items';
  featuredItemsFiltered : InventoryItem[] = [];

  featuredcurrentPage = 1;
  featureditemsPerPage = 3;
  featuredpageSize: number = 0;

  featuredselectedItem : InventoryItem = new InventoryItem(1,"",1,1, "", "", "", 0);
  featuredinStockChecked : boolean = true;


  featuredsearchText='';


  constructor(private _featuredItemsService : InventoryItemsService,
    private router : Router,
    private route : ActivatedRoute,
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
        this.featuredItemsService.inventoryItems = itemsList;
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
