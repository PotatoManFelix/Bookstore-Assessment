import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { BookCart, BookCartNoSelection, User } from '../_models';
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
        map(response => {
          return response.message;
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
            const user = response.user;
            const books : BookCartNoSelection[]  = response.cartProducts;
            const booksWithSelected : BookCart[] = books.map(book => ({
              ...book,
              selected: false,
            }));
            const cart = JSON.stringify(booksWithSelected)
            localStorage.setItem('cart', cart);
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
          })
        );
    }
    checkUserLoggedIn(){
      return this.http.post<boolean>(`${environment.apiUrl}/check-session`, { withCredentials: true });
    }
    logout(): void{
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
        ).subscribe(response => {
          // Clear local storage
          localStorage.removeItem('cart');
          localStorage.removeItem('user');
          localStorage.removeItem('books')
          // Clear the user subject and navigate to the login page after updating the cart
          this.userSubject.next(null);
          this.router.navigate(['/login']);
        });
      }else{
        console.log('error in local storage')
      }
    }
}