import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CookieService} from "ngx-cookie";
import {Router} from "@angular/router";
import {Order} from "./user-page.service";


export interface Account {
    id: number;
    email: string;
    name: string;
    points: number;
    role: Role;
    pointHistory: Order[];
}

export enum Role {
    USER,
    ADMIN,
}

export interface PointChange {
    cause: string;
    change: number;
    date: Date;
}

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    endpoint: string = "http://" + window.location.hostname + ":9001/accountsms/api/account/";

    _account: Account | null = null;

    constructor(private http: HttpClient, private cookies: CookieService, private router: Router) {
    }

    public getDummyAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(this.endpoint + "all")
    }

    loadAccount(): Observable<Account | null> {
        if (this._account) {
            return of(this._account);
        }

        const email = this.cookies.get("email");

        if (email) {
            return new Observable<Account | null>((observer) => this.login(email, () => observer.next(this._account)));
        }

        return of(this._account);
    }

    login(email: string, callback: () => void): void {
        const body = new HttpParams()
            .set('email', email);

        this.http.post<Account>(this.endpoint + 'dummylogin',
            body.toString(),
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            }
        ).subscribe(account => {
            this._account = account;

            this.cookies.put("email", account.email, {expires: new Date(Date.now() + 604800000)});
            callback();
        });

    }

    logout(): void {
        this._account = null;

        this.cookies.remove("email");
        this.router.navigateByUrl("/login");
    }

    get account(): Account | null {

        return this._account;
    }
    getUserInfo(email : string){



        const body = new HttpParams()
            .set('email', email);
        this.http.post<Account>(this.endpoint + 'dummylogin',
            body.toString(),
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            }
        ).subscribe(account => {
            this._account = account;
        });
    }


    getPurchaseHistory(email : string){
        const body = new HttpParams()
            .set('email', email);
        this.http.post<Account>(this.endpoint + 'dummylogin',
            body.toString(),
            {
                headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            }
        ).subscribe(account => {
            this._account = account;
        });
    }


}