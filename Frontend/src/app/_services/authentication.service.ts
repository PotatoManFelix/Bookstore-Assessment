import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { BookCart, User } from '../_models';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;
  
    constructor(
      private router: Router,
      private http: HttpClient,
      private cart: ShoppingCartService
    ) {
      this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
      this.user = this.userSubject.asObservable();
      
      // Initialize user data from cookies when the service is created
    }
  
    public get userValue() {
      return this.userSubject.value;
    }
    //TODO: FIX REGISTER
    register(username: string, email: string, password: string) {
      return this.http.post<any>(
        `${environment.apiUrl}/register`,
        { username, email, password },
        { withCredentials: true }
      ).pipe(
        map(user => {
          this.userSubject.next(user);
          return user;
        })
      );
    }

    login(email: string, password: string) {
      return this.http.post<any>(
        `${environment.apiUrl}/login`,
        { email, password },
        { withCredentials: true }
      ).pipe(
        map(response => {
            console.log(response);
            const user = response.user;
            const cart = response.cartProducts;
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            this.cart.updateLocalStorage();
          })
        );
    }
    checkUserLoggedIn(){
      return this.http.post<boolean>(`${environment.apiUrl}/check-session`, { withCredentials: true });
    }
    logout(){
      const cartDataString = localStorage.getItem('cart');
      const userDataString = localStorage.getItem('user');
      if (cartDataString !== null && userDataString !==null) {
        const initialCart = JSON.parse(cartDataString);
        const cart = initialCart.map(({ selected, ...rest }: { selected: boolean, [key: string]: any }) => rest);
        console.log(cart)
        const user = JSON.parse(userDataString);
        
        // Perform logout actions
        this.http.post(
          `${environment.apiUrl}/logout`, {user, cart},
          { withCredentials: true }
        ).subscribe(() => {
          // Clear local storage
          localStorage.removeItem('cart');
          localStorage.removeItem('user');
          // Clear the user subject and navigate to the login page after updating the cart
          // this.userSubject.next(null);
          // this.router.navigate(['/login']);
        });
      }else{
        console.log('error in local storage')
      }
    }
}