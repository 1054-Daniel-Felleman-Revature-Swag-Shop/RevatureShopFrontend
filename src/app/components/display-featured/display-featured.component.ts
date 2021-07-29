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

  itemImagesURL : string = "https://revature-swag-shop-images.s3.us-east-2.amazonaws.com";

  categoryOfItems : string = 'Featured Items';
  inventoryItemsFiltered : InventoryItem[] = [];

  currentPage = 1;
  itemsPerPage = 2;
  pageSize: number = 0;

  selectedItem : InventoryItem = new InventoryItem(1,"",1,1, "", "", "", 0);
  inStockChecked : boolean = true;

  sortMode : string = "id asc";

  searchText='';


  constructor(private _inventoryItemsService : InventoryItemsService,
    private router : Router,
    private route : ActivatedRoute,
    private displayFeaturedService : DisplayFeaturedService) {

   }

  ngOnInit(): void {

    this.fetchItemListByCategory("xxx");
  }


  get inventoryItemsService() {
    return this._inventoryItemsService;
  }

  fetchItemListByCategory(category: string) {

    if (category == 'featured') {

      this.displayFeaturedService.getInventoryItemsByCategory( category.toString() ).subscribe(

        itemsList => {
          this.inventoryItemsService.inventoryItems = itemsList;
          this.filterListByStock();
        }
      )

    }
    else{
        this.displayFeaturedService.getAllInventoryItems().subscribe(itemsList=>{
            this.inventoryItemsService.inventoryItems = itemsList;
            this.filterListByStock();
        });
    }
  }

  itemClicked(selectedItem : InventoryItem) {
    this.selectedItem = selectedItem;

  }

  filterListByStock() {

    this.inventoryItemsFiltered = this._inventoryItemsService.inventoryItems.filter(element => {
      return (this.inStockChecked && element.quantity > 0);
  });

  }


  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    window.scrollTo(0,0);
  }

  public changePagesize(num: number): void {
  this.itemsPerPage = this.pageSize + num;
}


}
