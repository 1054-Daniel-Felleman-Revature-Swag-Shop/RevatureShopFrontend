import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {InventoryItem} from 'src/app/services/inventory-items.service';
import {Cart} from "../components/cart/cart.component";

@Injectable({
    providedIn: 'root'
})
export class HttpCartService {

    totalItems: number = 0;

    baseServerURL = "http://" + window.location.hostname + ":9001/commercems/";

    httpHeadersJSON: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    httpHeadersTEXT: HttpHeaders = new HttpHeaders({'Content-Type': 'application/text'});
    httpOptionsJSON = {headers: this.httpHeadersJSON, withCredentials: true};
    httpOptionsTEXT = {headers: this.httpHeadersTEXT, withCredentials: true};

    constructor(private http: HttpClient) {
    }

    getItemByName(itemName: string): Observable<InventoryItem> {
        // var items: Observable<InventoryItem[]> =  this.http.get<InventoryItem[]>(this.baseServerURL + "/api/inventory/view", this.httpOptionsJSON);
        return this.http.get<InventoryItem>("http://" + window.location.hostname + ":9001/inventoryms/api/inventory/get/item/name?itemName=" + itemName);

    }

    getItemById(id: number): Observable<InventoryItem> {
        return this.http.get<InventoryItem>("http://" + window.location.hostname + ":9001/inventoryms/api/inventory/get/item/id?id=" + id);
    }

    getCart(username: string): Observable<any> {
        return this.http.get("http://" + window.location.hostname + ":9001/commercems/commerce/myCart/" + username);
    }

    updateCart(cart: Cart) {
        this.http.post("http://" + window.location.hostname + ":9001/commercems/commerce/savecart", cart, this.httpOptionsJSON).subscribe((data) => {
            this.updateItemNumber(data)
        });
    }

    // getInventoryItemsByCategory(category: string) : Observable<InventoryItem[]> {
    //
    //     var items: Observable<InventoryItem[]> =  this.http.post<InventoryItem[]>(this.baseServerURL + "/api/inventory/view/category", category,  this.httpOptionsTEXT);
    //     return items;
    //
    // }
    //
    // updateInventoryItemQuantity(inventoryItem : InventoryItem,  newQuantity : number) : Observable<boolean> {
    //
    //     var updatedInventoryItem = {"id": inventoryItem.id, "itemName": inventoryItem.itemName, "itemPrice": inventoryItem.itemPrice, "quantity": newQuantity, "category": inventoryItem.category, "description": inventoryItem.description};
    //
    //     var couldUpdate: Observable<boolean> = this.http.put<boolean>(this.baseServerURL + "/api/inventory/stockitem/update/quantity", updatedInventoryItem, this.httpOptionsJSON);
    //
    //     return couldUpdate;
    // }
    updateItemNumber(cart: Object): number {
        this.totalItems = 0;
        let myCart: Cart = <Cart>cart;
        Object.keys(myCart.stockItemMap).forEach((itemName) => {
            // @ts-ignore
            this.totalItems += myCart.stockItemMap[itemName];
        })
        return this.totalItems;
    }

    checkoutCart(userCart: any): Observable<any> {
        return this.http.post("http://" + window.location.hostname + ":9001/commercems/commerce/checkoutcart", userCart, this.httpOptionsJSON);
    }

    orderHistory(email: string): Observable<any> {
        return this.http.get("http://" + window.location.hostname + ":9001/commerce//myOrderHistory/" + email, this.httpOptionsJSON);
    }

    
}