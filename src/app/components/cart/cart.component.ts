import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpCartService} from "../../services/http-cart.service";
import {InventoryItem} from "../../services/inventory-items.service";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

export interface Cart {
    "cartId": number,
    "myShopper": string,
    "stockItemMap": object
}

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: Array<InventoryItem>;
    userCart: Cart;
    totalPrice: number;
    loggedShopper: string = '';
    shopperPoints: number = 0;
    itemImagesURL: string = "https://rss-images.s3.us-east-2.amazonaws.com/images";

    constructor(private http: HttpClient, public httpCartService: HttpCartService, private accountsService: AccountService, private router: Router) {
        this.cartItems = new Array<InventoryItem>();
        this.userCart = {
            "cartId": 0,
            "myShopper": "",
            stockItemMap: {}
        }
        this.totalPrice = 0;
    }

    ngOnInit(): void {
        this.accountsService.loadAccount().subscribe(data => {
            this.loggedShopper = <string>data?.email;
            this.shopperPoints = <number>data?.points;
        });
        this.loadCart();
    }

    loadCart() {
        this.totalPrice = 0;
        this.httpCartService.getCart(this.loggedShopper).subscribe((cart) => {
            this.userCart = cart;
            Object.keys(cart.stockItemMap).map(Number).forEach((id) => {
                this.httpCartService.getItemById(id).subscribe((item) => {
                    item.imageURL = "";
                    this.cartItems.push(item);
                    this.totalPrice += item.itemPrice*(1- item.discount) * this.getCartQuantity(item.id);
                });

            });
        });


    }

    updatePrice() {
        this.totalPrice = 0;
        for (let i = 0; i < this.cartItems.length; i++) {
            this.totalPrice += this.cartItems[i].itemPrice*(1-this.cartItems[i].discount) * this.getCartQuantity(this.cartItems[i].id);
        }
    }


    getItemImage(item: InventoryItem): string {

        return this.itemImagesURL + '/' + item.itemName + ".png";
    }

    getCartQuantity(id: number): number {
        if (this.hasKey(this.userCart.stockItemMap, id)) {
            return this.userCart.stockItemMap[id];
        }
        return 0;
    }

    updateCartQuantity(event: Event, id: number): void {
        if (this.hasKey(this.userCart.stockItemMap, id)) {
            // @ts-ignore

            this.userCart.stockItemMap[id] = event.target.value;
            this.updatePrice();
        }
        this.httpCartService.updateCart(this.userCart);

    }

    removeCartItem(id: number): void {
        if (this.hasKey(this.userCart.stockItemMap, id)) {
            delete this.userCart.stockItemMap[id]// works fine!
            this.updatePrice();
        }
        this.httpCartService.updateCart(this.userCart);

    }

    hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
        return key in obj
    }

    checkout() {
        this.router.navigate(['/checkout']).then();
    }

    get isDisabled(): boolean {
        let btn = document.getElementById("btnMessage");

        if (this.shopperPoints < this.totalPrice) {
            if (btn) {
                btn.setAttribute("title", "You don't have enough points!");
            }
        } else if (this.httpCartService.totalItems == 0) {
            if (btn) {
                btn.setAttribute("title", "You cannot check out an empty cart");
            }
        }

        return this.shopperPoints < this.totalPrice || this.httpCartService.totalItems == 0
    }
}
