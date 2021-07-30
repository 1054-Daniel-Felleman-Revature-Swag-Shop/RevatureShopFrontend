import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryItem, InventoryItemsService } from '../../services/inventory-items.service'
import { HttpUserInventoryPageService } from '../../services/http-user-inventory-page.service';

@Component({
  selector: 'app-admin-inventory-page',
  templateUrl: './admin-inventory-page.component.html',
  styleUrls: ['./admin-inventory-page.component.css']
})
export class AdminInventoryPageComponent implements OnInit {

  inventoryItemsFiltered : InventoryItem[] = [];

  currentPage = 1;
  itemsPerPage = 12;
  pageSize: number = 0;

  selectedItem : InventoryItem = new InventoryItem(1,"",1,1,"","","",0);
  inStockChecked : boolean = true;
  outOfStockChecked : boolean = true;

  sortMode : string = "id asc";

  selectedOption: string = '';

  selectedSize: string = '';

  p = 1;
  searchText='';

  itemImagesURL : string = "https://rss-images.s3.us-east-2.amazonaws.com";

  constructor(private _inventoryItemsService : InventoryItemsService,
    private router : Router,
    private httpUserInventoryService : HttpUserInventoryPageService) {


   }

  ngOnInit(): void {

    this.fetchInventoryItemsFromServer();
    this.applySortFilters();

  }

  get inventoryItemsService() {
    return this._inventoryItemsService;
  }


  itemClicked(selectedItem : InventoryItem) {
    this.selectedItem = selectedItem;

  }


  pageSelected() {
    window.scrollTo(0,0);
  }



  updateQuantityClicked(inventoryItemToBeUpdated: InventoryItem, newQuantity: string, inputId: string) {

    var newQuantityInt = parseInt(newQuantity);
    if (!isNaN(newQuantityInt)) {
      if (newQuantityInt >= 0) {

        this,this.httpUserInventoryService.updateInventoryItemQuantity(inventoryItemToBeUpdated, newQuantityInt).subscribe(
          (couldUpdate) => {
            if (couldUpdate) {

                // Being lazy for now, fetching all inventory items again upon successfully updating an item quantity
                // This will auto update inventoryItemsService.inventoryItems and therefore update the displayed list of items
                this.fetchInventoryItemsFromServer();


              }
              else {

              }

          }
        )
      }
    }
    else {
    }
  }

  updateDiscountClicked(itemToUpdate: InventoryItem, newDiscount: string, inputId: string) {
    //console.log(typeof newDiscount);
    var newDiscountInt = parseFloat(newDiscount);
    //console.log(newDiscountInt);
    if(!isNaN(newDiscountInt)) {
      if(newDiscountInt >= 0) {
        this.httpUserInventoryService.updateItemDiscount(itemToUpdate, newDiscountInt).subscribe(
          (couldUpdate) => {
            if(couldUpdate) {
              this.fetchInventoryItemsFromServer();
            }
            else {

            }
          }
        )
      }
    }
    else {

    }
  }

  fetchInventoryItemsFromServer() {

    this.httpUserInventoryService.getAllInventoryItems().subscribe(
      itemsList => {
        this.inventoryItemsService.inventoryItems = itemsList;

        this.applyAllFiltering();

      }
    )

  }

  filterListByStock() {

    /*
      Filter by stock status
    */

      this.inventoryItemsFiltered = this._inventoryItemsService.inventoryItems.filter(element => {
        return (this.inStockChecked && element.quantity > 0) || (this.outOfStockChecked && element.quantity == 0);
      });

  }

  public onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
    window.scrollTo(0,0);
  }

  public changePagesize(num: number): void {
  this.itemsPerPage = this.pageSize + num;
}

  applySortFilters() {

    // Sort By: None is the same as sort by item number (default)
    if (this.sortMode == "id asc") {
        this.inventoryItemsFiltered = this.inventoryItemsFiltered.sort(
          (invItem1, invItem2) => {
            return invItem1.id - invItem2.id;
          }
        )
    }
    else if (this.sortMode == "price asc") {
      this.inventoryItemsFiltered = this.inventoryItemsFiltered.sort(
        (invItem1, invItem2) => {
          return invItem1.itemPrice - invItem2.itemPrice;
        }
      )
    }
    else if (this.sortMode == "price desc") {
      this.inventoryItemsFiltered = this.inventoryItemsFiltered.sort(
        (invItem1, invItem2) => {
          return invItem2.itemPrice - invItem1.itemPrice;
        }
      )
    }
    else if (this.sortMode == "name asc") {
      this.inventoryItemsFiltered = this.inventoryItemsFiltered.sort(
        (invItem1, invItem2) => {
          if (invItem1.itemName < invItem2.itemName) {
            return -1;
          }
          else if (invItem1.itemName > invItem2.itemName) {
            return 1;
          }
          return 0;
        }
      )
    }
    else if (this.sortMode == "name desc") {
      this.inventoryItemsFiltered = this.inventoryItemsFiltered.sort(
        (invItem1, invItem2) => {
          if (invItem1.itemName < invItem2.itemName) {
            return 1;
          }
          else if (invItem1.itemName > invItem2.itemName) {
            return -1;
          }
          return 0;
        }
      )
    }

  }


  applyAllFiltering() {
    this.filterListByStock();
    this.applySortFilters();
  }

  updateSize() {
    // this.httpItemModalService.getItemByNameAndSize(this.title, this.selectedSize).subscribe((item) => {
    //     this.id = item.id;
    //     this.quantity = item.quantity;
    // });
  }

}
