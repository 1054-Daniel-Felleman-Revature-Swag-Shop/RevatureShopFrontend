import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem, InventoryItemsService } from '../../services/inventory-items.service'
import { DisplaySaleService } from '../../services/display-sale.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-display-sale',
  templateUrl: './display-sale.component.html',
  styleUrls: ['./display-sale.component.css']
})
export class DisplaySaleComponent implements OnInit {

  itemImagesURL : string = "https://revature-swag-shop-images.s3.us-east-2.amazonaws.com";

  categoryOfItems : string = 'On Sale';
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
    private displaySaleService : DisplaySaleService) {

   }

  ngOnInit(): void {

    this.fetchItemListByCategory("xxx");
  }


  get inventoryItemsService() {
    return this._inventoryItemsService;
  }

  fetchItemListByCategory(category: string) {

    if (category == 'on-sale') {

      this.displaySaleService.getInventoryItemsByCategory( category.toString() ).subscribe(

        itemsList => {
          this.inventoryItemsService.inventoryItems = itemsList;
          this.filterListByStock();
        }
      )

    }
    else{
        this.displaySaleService.getAllInventoryItems().subscribe(itemsList=>{
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
