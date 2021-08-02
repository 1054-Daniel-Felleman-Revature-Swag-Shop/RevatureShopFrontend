import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { InventoryItem } from 'src/app/services/inventory-items.service';

@Injectable({
  providedIn: 'root'
})
export class HttpUserInventoryPageService {



   baseServerURL = "http://" + window.location.hostname + ":9001/inventoryms/";

  httpHeadersJSON: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'email': this.cookies.get('email')});
  httpHeadersTEXT: HttpHeaders = new HttpHeaders({'Content-Type': 'application/text'});
  httpOptionsJSON = { headers: this.httpHeadersJSON, withCredentials: true };
  httpOptionsTEXT = { headers: this.httpHeadersTEXT, withCredentials: true };


  constructor(private http : HttpClient, private cookies: CookieService) {

   }

   getAllInventoryItems() : Observable<InventoryItem[]> {

      //var userLoginDTO = {"email": "dude", "password": "cool"};

      var items: Observable<InventoryItem[]> =  this.http.get<InventoryItem[]>(this.baseServerURL + "/api/inventory/view", this.httpOptionsJSON);
      return items;

   }

   getInventoryItemsByCategory(category: string) : Observable<InventoryItem[]> {

      var items: Observable<InventoryItem[]> =  this.http.post<InventoryItem[]>(this.baseServerURL + "/api/inventory/view/itemsbycategory", category,  this.httpOptionsTEXT);
      return items;

   }

   updateInventoryItemQuantity(inventoryItem : InventoryItem,  newQuantity : number) : Observable<boolean> {

      var updatedInventoryItem = {"id": inventoryItem.id, "itemName": inventoryItem.itemName, "itemPrice": inventoryItem.itemPrice, "quantity": newQuantity, "category": inventoryItem.category, "description": inventoryItem.description, "discount": inventoryItem.discount};

      var couldUpdate: Observable<boolean> = this.http.put<boolean>(this.baseServerURL + "/api/inventory/stockitem/update/quantity", updatedInventoryItem, this.httpOptionsJSON);

      return couldUpdate;

   }

   updateItemDiscount(inventoryItem: InventoryItem, newDiscount: number): Observable<boolean> {
     var updatedInventoryItem = {"id": inventoryItem.id, "itemName": inventoryItem.itemName, "itemPrice": inventoryItem.itemPrice, "quantity": inventoryItem.quantity, "category": inventoryItem.category, "description": inventoryItem.description, "discount": newDiscount};

     var couldUpdate: Observable<boolean> = this.http.put<boolean>(this.baseServerURL + "/api/inventory/stockitem/update/discount", updatedInventoryItem, this.httpOptionsJSON);

     return couldUpdate;
   }

   getInventoryItemsByFeatured() : Observable<InventoryItem[]> {

      var items: Observable<InventoryItem[]> =  this.http.get<InventoryItem[]>(this.baseServerURL + "/api/inventory/view/getfeatured", this.httpOptionsJSON);
      return items;
 
   }

   getInventoryItemsByOnSale() : Observable<InventoryItem[]> {

      var items: Observable<InventoryItem[]> =  this.http.get<InventoryItem[]>(this.baseServerURL + "/api/inventory/view/onsale", this.httpOptionsJSON);
      return items;
 
   }

   getInventoryItemsByPopular() : Observable<InventoryItem[]> {

      var items: Observable<InventoryItem[]> =  this.http.get<InventoryItem[]>(this.baseServerURL + "/api/inventory//view/mostpopular", this.httpOptionsJSON);
      return items;
 
   }
}
