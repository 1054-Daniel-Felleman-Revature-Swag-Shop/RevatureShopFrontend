import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountService} from "./account.service";
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Order {
    change: number;
    date: Date;
    cause: string;
}

export interface purchaseHistory {
    myShopper : string;
    purchaseDate : Date;
    itemName : string;
    itemQuantity : number;
    itemPrice : number;
    purchaseAmount : number;
}
@Injectable({
    providedIn: 'root'
})
export class UserPageService {
    // @ts-ignore
    orderList: purchaseHistory[] = []
    // @ts-ignore
    transactions: Observable<purchaseHistory[]>;
    // @ts-ignore
    previousOrders: Order[];
    commerceURL: string = 'http://localhost:9001/commercems/commerce';
    accountURL: string = 'http://localhost:9001/commercems/commerce';
    email: string = '';
    // @ts-ignore
    temp1: Order[] = [
        {change: -30, date: new Date('Fri, 01 Jan 1971 00:00:00 GMT'), cause: ""},
        {change: 30, date: new Date(Date.now() - 1223), cause: ""},
        {change: 30, date: new Date(Date.now() - 123123), cause: ""},
        {change: -40, date: new Date(Date.now() - 12123), cause: ""},
        {change: 30, date: new Date(Date.now() - 12313123), cause: ""},
        {change: 30, date: new Date(Date.now() - 3123123), cause: ""},
    ];

    // @ts-ignore
    temp2: Order[] = [
        {change: 30, date: new Date(), cause: ""},
        {change: 30, date: new Date(), cause: ""},
        {change: 300, date: new Date(), cause: ""},
        {change: 3000, date: new Date(), cause: ""},
        {change: -3000, date: new Date(), cause: ""},
        {change: 30, date: new Date(), cause: ""},
    ];
    // @ts-ignore
    private order: Order;

    constructor(private http: HttpClient, private accountService: AccountService) {
    }

    history(): Observable<Order[]> {
        console.log(this.accountService.account);
        // @ts-ignore
        this.email = this.accountService.account.email;
        // @ts-ignore
        this.previousOrders = this.accountService.account?.pointHistory;
        this.transactions = this.http.get <purchaseHistory[]> (this.commerceURL + '/myOrderHistory/' + this.email);



        // @ts-ignore
         return this.transactions.pipe(map(value => {
             return value.map(each => ({cause:'Purchase', change : each.purchaseAmount, date: each.purchaseDate}))

        }));


    }

    orders(): Observable<Order[]>{
        // @ts-ignore
        return this.accountService.account?.pointHistory ;
    }
}