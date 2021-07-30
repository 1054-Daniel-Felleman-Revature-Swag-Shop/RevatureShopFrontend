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

  saleitemImagesURL : string = "https://revature-swag-shop-images.s3.us-east-2.amazonaws.com";

  salecategoryOfItems : string = 'On Sale';
  saleItemsFiltered : InventoryItem[] = [];

  salecurrentPage = 1;
  saleitemsPerPage = 3;
  salepageSize: number = 0;

  saleselectedItem : InventoryItem = new InventoryItem(1,"",1,1, "", "", "", 0);
  saleinStockChecked : boolean = true;


  salesearchText='';


  constructor(private _saleItemsService : InventoryItemsService,
    private router : Router,
    private route : ActivatedRoute,
    private displaySaleService : DisplaySaleService) {

   }

  ngOnInit(): void {

    this.fetchsaleItemListByCategory();
  }


  get saleItemsService() {
    return this._saleItemsService;
  }

  fetchsaleItemListByCategory() {

    this.displaySaleService.getInventoryItemsByOnSale().subscribe(
      itemsList => {
        this.saleItemsService.inventoryItems = itemsList;
        this.filtersaleListByStock();
      }
    )
  }

  saleitemClicked(selectedItem : InventoryItem) {
    this.saleselectedItem = selectedItem;

  }

  filtersaleListByStock() {

    this.saleItemsFiltered = this._saleItemsService.inventoryItems.filter(element => {
      return (this.saleinStockChecked && element.quantity > 0);
  });

  }


  public saleonPageChange(pageNum: number): void {
    this.salepageSize = this.saleitemsPerPage*(pageNum - 1);
  }

  public salechangePagesize(num: number): void {
  this.saleitemsPerPage = this.salepageSize + num;
}


}
