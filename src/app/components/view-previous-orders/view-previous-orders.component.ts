import { ValueVisitor } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { HttpCartService } from 'src/app/services/http-cart.service';
import { HttpService } from 'src/app/services/http.service';
import { AccountService, Account } from "../../services/account.service";
import { HttpItemModalService } from "../../services/http-item-modal.service";

@Component({
  selector: 'app-view-previous-orders',
  templateUrl: './view-previous-orders.component.html',
  styleUrls: ['./view-previous-orders.component.css']
})
export class ViewPreviousOrdersComponent implements OnInit {

  constructor(private httpCartService: HttpCartService, private accountService: AccountService, private httpModalService: HttpItemModalService) { }

  email: any;
  previousOrders: any;
  itemId: number = 0;
  itemName: string = '';
  itemImagesURL: string = "https://rss-images.s3.us-east-2.amazonaws.com/images/";

  ngOnInit(): void {
    this.setEmail();
    this.getOrderHistory();
  }

  setEmail(): void {
    let email: string = document.cookie
    email.split("=");
    let username = email.split("=")[1].split("%")[0];
    let system = email.split("=")[1].split("%")[1].split('0')[1];
    this.email = username + `@${system}`;

  }



  getOrderHistory(): void {


    this.httpCartService.orderHistory(this.email).subscribe(
      data => {
        this.previousOrders = data;


        for (let i = 0; i < data.length; i++) {


          let status = this.calculateStatus(this.previousOrders[i].purchaseDate);
          // Change here when backend is updated.
          let itemName = this.previousOrders[i].itemName;
          this.httpCartService.getItemByName(itemName).subscribe((item) => {
            this.previousOrders[i].itemId = item.id;
            console.log(this.previousOrders)
          });





          switch (status) {
            case 0:
              this.previousOrders[i].status = "Pending"
              break;
            case 1:
              this.previousOrders[i].status = "Confirmed"
              break;
            case 2:
              this.previousOrders[i].status = "Sent to carrier"
              break;
            case 3:
              this.previousOrders[i].status = "In Transit"
              break;
            case 4:
              this.previousOrders[i].status = "Out For Delivery"
              break;
            case 5:
              this.previousOrders[i].status = "Delivered"
              break;
          }

        }
      }


    );


  }




  orderAgian(itemId: number): void {

    if (itemId) {
      this.addToCart(itemId);
    }
  }

  calculateStatus(purchaseDate: string): number {

    if (purchaseDate) {

      let purchaseDateObj = purchaseDate.split('-');
      let day = parseInt(purchaseDateObj[2]);
      let currentDate = new Date().getDate();
      let status = day - currentDate;
      return status;
    }
    return 0;
  }

  addToCart(itemId: number): void {
    let item = this.httpModalService.getItemById(itemId).subscribe((item) => {
      
      this.httpModalService.addItemToCart(item, this.email, 1);
    });
  }

}
