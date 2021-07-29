import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StatesService, state} from "../../services/states.service";
import {Account, AccountService} from "../../services/account.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";
import {HttpCartService} from "../../services/http-cart.service";
import {Cart} from "../cart/cart.component";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

    // @ts-ignore
    firstFormGroup: FormGroup;
    // @ts-ignore
    secondFormGroup: FormGroup;
    // @ts-ignore
    thirdFormGroup: FormGroup;

    addressForm = this.fb.group({
        company: null,
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        address: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required],
        postalCode: [null, Validators.compose([
            Validators.required, Validators.minLength(5), Validators.maxLength(5)])
        ],
        moreInfo: [null]
    });
    states: state[] = [];
    pointsAfterMath: number = 0;
    loggedShopper: string='';
    checkoutCart: Cart;

    constructor(private fb: FormBuilder, private ss: StatesService, private as: AccountService, private cs: HttpCartService, private co: CheckoutService, private router: Router) {
        this.states = ss.states;
        this.loggedShopper=<string>this.as.account?.email;
        this.checkoutCart = {
            "cartId": 0,
            "myShopper": "",
            stockItemMap: {}
        }
        let price:number=0;
        this.cs.getCart(this.loggedShopper).subscribe(cart=>{
            this.checkoutCart=cart;
            Object.keys(this.checkoutCart.stockItemMap).map(Number).forEach((id) => {

                this.cs.getItemById(id).subscribe((item) => {
                    item.imageURL="";
                    // @ts-ignore
                    price += item.itemPrice*(1- item.discount) * this.checkoutCart.stockItemMap[item.id];
                    this.pointsAfterMath=<number>this.as.account?.points-price;
                });

        });
    });
    }

    ngOnInit() {
        this.firstFormGroup = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
        });
        this.secondFormGroup = this.fb.group({
            address: ['', Validators.required],
            city: [null, Validators.required],
            state: [null, Validators.required],
            postalCode: [null, Validators.compose([
                Validators.required, Validators.minLength(5), Validators.maxLength(5)])
            ],
        });
        this.thirdFormGroup = this.fb.group({
            moreInfo: null,
        })
        //NOT EXACTLY SURE IF THIS WORKS THIS WAY,
        // HOPEFULLY THESE FORMS OVERWRITE THE CORRECT INFORMATION IN THE SERVICE OBJECT
        this.firstFormGroup.valueChanges.subscribe(form => {
            this.co.checkOutInfo = form;
        })
        this.secondFormGroup.valueChanges.subscribe(form => {
            this.co.checkOutInfo = form;
        })
        this.thirdFormGroup.valueChanges.subscribe(form => {
            this.co.checkOutInfo = form;
        })
    }

    checkout() {
        this.cs.checkoutCart(this.checkoutCart).subscribe(()=>{

            this.as.account && this.as.getUserInfo(this.as.account.email);
        });
        // @ts-ignore
        this.as.account.points = this.pointsAfterMath;
       this.cs.totalItems = 0;
    this.router.navigate(['confirmCheckout']).then(r =>{});

    }

    get account(): Account {
        return <Account>this.as.account;
    }


}
