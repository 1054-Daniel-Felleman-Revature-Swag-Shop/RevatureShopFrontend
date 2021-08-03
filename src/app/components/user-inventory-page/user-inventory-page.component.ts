import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryItem, InventoryItemsService } from '../../services/inventory-items.service';
import { HttpUserInventoryPageService } from '../../services/http-user-inventory-page.service';
import { DisplayPopularComponent } from '../display-popular/display-popular.component';


@Component({
  selector: 'app-user-inventory-page',
  templateUrl: './user-inventory-page.component.html',
  styleUrls: ['./user-inventory-page.component.css']
})
export class UserInventoryPageComponent implements OnInit {

  itemImagesURL : string = "https://rss-images.s3.us-east-2.amazonaws.com";

  categoryOfItems : string = '';
  inventoryItemsFiltered : InventoryItem[] = [];

  p = 1;
  p1 = 1;
  p2 = 1;
  p3 = 1;

  selectedItem : InventoryItem = new InventoryItem(1,"",1,1, "", "","",0);
  inStockChecked : boolean = true;
  outOfStockChecked : boolean = false;

  sortMode : string = "id asc";

  searchText='';


  constructor(private _inventoryItemsService : InventoryItemsService,
    private router : Router,
    private route : ActivatedRoute,
    private httpUserInventoryService : HttpUserInventoryPageService,
    private popularItems : DisplayPopularComponent) {

  }

  numItems = this.popularItems.popularItemsService.inventoryItems.length;
  
  ngOnInit(): void {

    // Get shop category (clothing, accessories, etc.)
    //var category = this.route.snapshot.paramMap.get('category');

    this.fetchfeaturedItemListByCategory();
    this.fetchsaleItemListByCategory();
    this.fetchpopularItemListByCategory();

    this.route.params.subscribe(params => {

      let category = params['category'];

      this.categoryOfItems = category;
      this.fetchItemListByCategory(category);

    })


  }

  get inventoryItemsService() {
    return this._inventoryItemsService;
  }

  fetchItemListByCategory(category: string) {

    if (category != 'Catalog') {

      this.httpUserInventoryService.getInventoryItemsByCategory( category.toString() ).subscribe(

        itemsList => {
          this.inventoryItemsService.inventoryItems = itemsList;
          this.applyAllFiltering();
        }
      )

    }
    else{
        this.httpUserInventoryService.getAllInventoryItems().subscribe(itemsList=>{
            this.inventoryItemsService.inventoryItems = itemsList;
            this.applyAllFiltering();
        });
    }
  }

  itemClicked(selectedItem : InventoryItem) {
    this.selectedItem = selectedItem;

  }


  filterListByStock() {

    /*
      Filter by stock status
    */
    this.inventoryItemsFiltered = this._inventoryItemsService.inventoryItems.filter(element => {
      return ((this.inStockChecked && element.quantity > 0) || (this.outOfStockChecked && element.quantity == 0))
      && (element.size == null || element.size == 'Small');
  });

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









  featuredcategoryOfItems : string = 'Featured Items';
  featuredItemsFiltered : InventoryItem[] = [];

  featuredcurrentPage = 1;
  featureditemsPerPage = 3;
  featuredpageSize: number = 0;

  featuredinStockChecked : boolean = true;


  featuredsearchText='';


  get featuredItemsService() {
    return this._inventoryItemsService;
  }

  fetchfeaturedItemListByCategory() {

    this.httpUserInventoryService.getInventoryItemsByFeatured().subscribe(
      itemsList => {
        this.featuredItemsService.inventoryItems = itemsList;
        this.filterfeaturedListByStock();
      }
    )
  }


  filterfeaturedListByStock() {

    this.featuredItemsFiltered = this._inventoryItemsService.inventoryItems.filter(element => {
      return (this.featuredinStockChecked && element.quantity > 0);
  });

  }

  public featuredonPageChange(pageNum: number): void {
    this.featuredpageSize = this.featureditemsPerPage*(pageNum - 1);
  }

  public featuredchangePagesize(num: number): void {
  this.featureditemsPerPage = this.featuredpageSize + num;
}













  salecategoryOfItems : string = 'On Sale';
  saleItemsFiltered : InventoryItem[] = [];

  salecurrentPage = 1;
  saleitemsPerPage = 3;
  salepageSize: number = 0;

  saleinStockChecked : boolean = true;


  salesearchText='';


  get saleItemsService() {
    return this._inventoryItemsService;
  }

  fetchsaleItemListByCategory() {

    this.httpUserInventoryService.getInventoryItemsByOnSale().subscribe(
      itemsList => {
        this.saleItemsService.inventoryItems = itemsList;
        this.filtersaleListByStock();
      }
    )
  }

  filtersaleListByStock() {

    this.saleItemsFiltered = this._inventoryItemsService.inventoryItems.filter(element => {
      return (this.saleinStockChecked && element.quantity > 0);
  });

  }


  public saleonPageChange(pageNum: number): void {
    this.salepageSize = this.saleitemsPerPage*(pageNum - 1);
  }

  public salechangePagesize(num: number): void {
  this.saleitemsPerPage = this.salepageSize + num;
}





popularcategoryOfItems : string = 'Popular Items';
popularItemsFiltered : InventoryItem[] = [];

popularcurrentPage = 1;
popularitemsPerPage = 3;
popularpageSize: number = 0;

popularinStockChecked : boolean = true;


popularsearchText='';


  get popularItemsService() {
    return this._inventoryItemsService;
  }

  fetchpopularItemListByCategory() {

    this.httpUserInventoryService.getInventoryItemsByPopular().subscribe(
      itemsList => {
        this.popularItemsService.inventoryItems = itemsList;
        this.filterpopularListByStock();
      }
    )
  }


  filterpopularListByStock() {

    this.popularItemsFiltered = this._inventoryItemsService.inventoryItems.filter(element => {
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
