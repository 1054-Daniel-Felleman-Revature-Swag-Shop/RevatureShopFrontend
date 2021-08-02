import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserInventoryPageComponent} from './components/user-inventory-page/user-inventory-page.component';
import {LoginComponent} from "./components/login/login.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {AuthGuard} from "./auth.guard";
import {CartComponent} from "./components/cart/cart.component";
import {UserPageComponent} from "./components/user-page/user-page.component";
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import { AdminInventoryPageComponent } from './components/admin-inventory-page/admin-inventory-page.component';
import { AdminNewInventoryPageComponent } from "./components/admin-new-inventory-page/admin-newinventory-page.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {CheckoutConfirmationPageComponent} from "./components/checkout-confirmation-page/checkout-confirmation-page.component";
import {AdminAddPointsComponent} from "./components/admin-add-points/admin-add-points.component";
import { ViewPreviousOrdersComponent } from './components/view-previous-orders/view-previous-orders.component';

const routes: Routes = [
    {path: 'previousOrder', component: ViewPreviousOrdersComponent},
    
    {path: 'shop/:category', component: UserInventoryPageComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
    {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
    {path: 'updateitem', component: AdminInventoryPageComponent, canActivate: [AuthGuard]},
    {path: 'newinventory', component: AdminNewInventoryPageComponent, canActivate: [AuthGuard]},
    {path: 'home', component: LandingPageComponent, canActivate: [AuthGuard]},
    {path: 'confirmCheckout', component: CheckoutConfirmationPageComponent, canActivate: [AuthGuard] },
    {path: 'user', component: UserPageComponent, canActivate:[AuthGuard]},
    {path: 'points', component : AdminAddPointsComponent, canActivate:[AuthGuard]},
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: '**', component : PageNotFoundComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
