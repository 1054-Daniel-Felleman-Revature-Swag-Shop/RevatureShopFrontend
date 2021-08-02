import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem, InventoryItemsService } from '../../services/inventory-items.service'
import { HttpUserInventoryPageService } from '../../services/http-user-inventory-page.service';

@Component({
  selector: 'app-display-popular',
  templateUrl: './display-popular.component.html',
  styleUrls: ['./display-popular.component.css']
})
export class DisplayPopularComponent implements OnInit {
  itemNames: string[] = [];
  itemImagesURL: string = "https://rss-images.s3.us-east-2.amazonaws.com";

  popularcategoryOfItems : string = 'Popular Items';
  popularItemsFiltered : InventoryItem[] = [];

  popularcurrentPage = 1;
  popularitemsPerPage = 3;
  popularpageSize: number = 0;

  popularselectedItem : InventoryItem = new InventoryItem(1,"",1,1, "", "", "", 0);
  popularinStockChecked : boolean = true;


  popularsearchText='';


  constructor(private _popularItemsService : InventoryItemsService,
    private router : Router,
    private route : ActivatedRoute,
    private httpUserInventoryPageService : HttpUserInventoryPageService) {

   }

  ngOnInit(): void {

    this.fetchpopularItemListByCategory();
  }


  get popularItemsService() {
    return this._popularItemsService;
  }

  fetchpopularItemListByCategory() {

    this.httpUserInventoryPageService.getInventoryItemsByPopular().subscribe(
      itemsList => {
        this._popularItemsService.inventoryItems = this.filterItems(itemsList);
        this.filterpopularListByStock();
      }
    )
  }

  filterItems(items: any) {
    items.map((x: any) => {
      if (!(this.itemNames.includes(x.itemName))) {
        this.itemNames.push(x.itemName)
      }
    })
    while (items.length > this.itemNames.length) {
      console.log('hit')
      items.pop()
    }
    console.log(items)
    return items
  }

  popularitemClicked(selectedItem : InventoryItem) {
    this.popularselectedItem = selectedItem;

  }

  filterpopularListByStock() {

    this.popularItemsFiltered = this._popularItemsService.inventoryItems.filter(element => {
      return (this.popularinStockChecked && element.quantity > 0);
  });

  }


  public popularonPageChange(pageNum: number): void {
    this.popularpageSize = this.popularitemsPerPage*(pageNum - 1);
  }

  public popularchangePagesize(num: number): void {
  this.popularitemsPerPage = this.popularpageSize + num;
}
}