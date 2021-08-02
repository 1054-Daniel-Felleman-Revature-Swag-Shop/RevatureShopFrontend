import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface StockItem {
    itemName: string,
    itemPrice: number,
    quantity: number,
    category: string,
    description: string
}

export interface shoppingCart{
    myShopper: string,
    myCart: Array<StockItem>
    cartTotal: number
}

@Injectable({
  providedIn: 'root'
})

export class HttpService {
    private accountURL = "/api/accounts/";
    private commerceURL = "/api/commerce/";
    private inventoryURL = "/api/inventory/";

  constructor(private http: HttpClient) { }

addToCart(itemToAdd:StockItem, shopper:string): Observable<shoppingCart> {
const body = new HttpParams();
body.set("StockItemDto",itemToAdd.toString());

return this.http.put<shoppingCart>(this.commerceURL + 'addtocart',body.toString());
}

myCart(shopper:string): Observable<any> {
        const body = new HttpParams();
        body.set("myShopper",shopper);
        return this.http.get<shoppingCart>(this.commerceURL + 'mycart/'+shopper);
}

checkoutCart(shopper:string): Observable<number> {
    const body = new HttpParams();
    body.set("myShopper",shopper);
    return this.http.post<number>(this.commerceURL + 'checkoutcart',body);
}

orderHistory(email: string): Observable<any> {
    let url = "http://" + window.location.hostname + ":9001/commerce"

    return this.http.get<any>(url + "/myOrderHistory/" + email);
}
}
