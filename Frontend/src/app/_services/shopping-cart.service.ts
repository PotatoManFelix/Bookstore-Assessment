import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs';

import { BookCart } from '../_models';
import { Book } from '../_models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItemsSubject : BehaviorSubject<BookCart[]>;
  constructor(private router: Router, private http: HttpClient) { 
    this.cartItemsSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('cart')!));
    this.updateLocalStorage();
  }
  get cartItems$(): Observable<BookCart[]> {
    return this.cartItemsSubject.asObservable();
  }
  public updateLocalStorage(): void {
    this.cartItems$.pipe(
      take(1), // Take only the first emitted value
      tap(books => {
        localStorage.setItem('cart', JSON.stringify(books || []));
      })
    ).subscribe()
  }

  private mapBookToBookCart(book: Book, q : number, format:string): BookCart {
    return {
      id: book.id.concat("/format/",format), //unique identifier for each format
      name: book.name,
      image: book.image,
      author: book.author,
      price: (format==="Paper")? book.price+5 : book.price, // for demonstration purposes only
      quantity: q,
      selected: false
    };
  }

  addItem(item: Book, quantity: number, format: string): void {
    if(format!=="E-Book"&& format!=="Paper"){
      console.log("Error In Book Type / Potential New Type Added, Adjustments need to be made")
      return;
    }
    if(!item.format.includes(format)){
      console.log("Invalid Book Format")
      return;
    }
    this.cartItems$.pipe(take(1)).subscribe(
      books =>{
        if(!books){
          books = [];
        }
        const toAdd = books.find(book => book.id === item.id + "/format/" + format);
        if (toAdd) {
          toAdd.quantity += quantity;
        } else {
          books.push(this.mapBookToBookCart(item, quantity,format));
        }
        this.updateLocalStorage();
      }
    );
  }  
  removeItem(itemId: string): void {
    this.cartItems$.subscribe( books => {
      const index = books.findIndex(book => book.id === itemId);
      if (index !== -1) {
        books.splice(index, 1);
        this.updateLocalStorage();
    } else {
        console.log("Book not found in the array.");
    }
    });
  }

  increaseQuantity(itemId : string): void{
    this.cartItems$.subscribe( books => {
        const book = books.find(book => book.id ===itemId);
        if(book){
          book.quantity+=1;
          this.updateLocalStorage();
        }else{
          console.log("Design Fault: Increasing quality of non-existing book in the cart")
        }
    });
  }

  decreaseQuantity(itemId : string) : void{
    this.cartItems$.subscribe( books => {
      const book = books.find(book => book.id ===itemId);
      if(book && book.quantity===1){
        this.removeItem(itemId);
      }else if (book){
        book.quantity-=1;
        this.updateLocalStorage();
      }else{
        console.log("Design Fault:Decreasing quality of non-existing book in the cart")
      }
    });
  }

  updateSelection(itemId: string){
    this.cartItems$.subscribe( books=> {
      const book = books.find(book => book.id === itemId);
      if(book){
        book.selected = !book.selected;
        this.updateLocalStorage();
      }else{
        console.log("Design Fault: Selecting an item that doesn't exist")
      }
    })
  }
  cartToCheckout(){
    let modifiedBooks: any[] = [];
    this.cartItems$.subscribe( bookCart => {
      const books = bookCart.filter(book => book.selected === true)
      modifiedBooks = books.map(item => {
        const { id,name,image,author,selected, ...rest } = item;
        const [ bookId, format] = id.split('/format/');
        return  { bookId, format, ...rest};
      });
    });
    return modifiedBooks;
  }
  clearCart(): void {
    const userData = localStorage.getItem('user');
    if(userData){
      const user = JSON.parse(userData);
    this.http.post<any>(
      `${environment.apiUrl}/clear-cart`,
      { user }
    ).subscribe(
      response => {
        if(response && response.message && response.message === "Cart Cleared Successfully"){
          localStorage.setItem('cart', JSON.stringify([]))
        }
      }
    );
    }else{
      console.log("User not existent in local storage")
    }
  }
}
