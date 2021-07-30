import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {LoginComponent} from "./components/login/login.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModules} from './materialModules';
import {AppRoutingModule} from './app-routing.module';
import {UserInventoryPageComponent} from './components/user-inventory-page/user-inventory-page.component';
import {AdminInventoryPageComponent} from './components/admin-inventory-page/admin-inventory-page.component';
import {CartComponent} from './components/cart/cart.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ItemModalComponent} from './components/item-modal/item-modal.component';
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from './components/navbar/navbar.component';
import {CookieModule} from "ngx-cookie";
import {AdminItemModalComponent} from './components/admin-item-modal/admin-item-modal.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {PointTrackerComponent} from './components/point-tracker/point-tracker.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AdminNewInventoryPageComponent} from './components/admin-new-inventory-page/admin-newinventory-page.component';
import {MatIconModule} from "@angular/material/icon";
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {FileUploaderComponent} from './components/file-uploader/file-uploader.component';
import {CheckoutConfirmationPageComponent} from './components/checkout-confirmation-page/checkout-confirmation-page.component';
import {AdminAddPointsComponent} from './components/admin-add-points/admin-add-points.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DisplaySaleComponent } from './components/display-sale/display-sale.component';
import { DisplayFeaturedComponent } from './components/display-featured/display-featured.component';
import {CarouselModule} from 'primeng/carousel';
import { ViewPreviousOrdersComponent } from './components/view-previous-orders/view-previous-orders.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        CartComponent,
        UserInventoryPageComponent,
        AdminInventoryPageComponent,
        CheckoutComponent,
        AdminInventoryPageComponent,
        ItemModalComponent,
        AdminItemModalComponent,
        AppComponent,
        NavbarComponent,
        AdminAddPointsComponent,
        UserPageComponent,
        PointTrackerComponent,
        LandingPageComponent,
        PointTrackerComponent,
        PageNotFoundComponent,
        AdminNewInventoryPageComponent,
        FileUploaderComponent,
        PageNotFoundComponent,
        CheckoutConfirmationPageComponent,
        DisplaySaleComponent,
        DisplayFeaturedComponent,

        ViewPreviousOrdersComponent
    ],
    imports: [
        BrowserModule,
        CookieModule.forRoot(),
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModules,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MaterialFileInputModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        CarouselModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
