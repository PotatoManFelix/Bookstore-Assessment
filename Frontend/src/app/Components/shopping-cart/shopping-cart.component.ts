import { Component, OnInit  } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';
import { BookCart } from '@app/_models';
import { ShoppingCartService } from '@app/_services';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: BookCart[] = [];
  showWarning = false;
  showOverlay = false;
  constructor(private cartService: ShoppingCartService, private router : Router) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(books=>{
      if(books){
        this.cartItems = books;
      }
    })
    // const booksJSON = localStorage.getItem('books');
    // if(booksJSON){
    //   const booksArray = JSON.parse(booksJSON);
    //   if(booksArray && booksArray.length > 0){
    //     this.cartService.addItem(booksArray[1],1,"Paper");
    //     console.log(this.cartService.cartItems$);
    //   }
    // }
  }
  
  removeItem(itemId: string): void {
    this.cartService.removeItem(itemId);
  }
  decreaseQuantity(item: BookCart) : void {
    if(item.quantity>1){
      this.cartService.decreaseQuantity(item.id);
    }else{
      this.showWarning=true;
    }
  }
  increaseQuantity(itemId: string) : void {
    this.cartService.increaseQuantity(itemId);
  }
  confirmRemove(itemId: string): void {
      this.cartService.decreaseQuantity(itemId);
      this.showWarning = false
  }
  calculateTotal():number{
    var sum=0;
    this.cartItems.forEach(book => {
      if(book.selected){
        sum+=(book.price*book.quantity);
      }
    });
    return parseFloat(sum.toFixed(2));
  }
  getFormatFromId(itemId: string) : string{
    const parts = itemId.split('/format/');
    if (parts.length >= 2) {
      return parts[1];
    } else {
      return 'Unknown Format';
    }
  }

  updateSelection(itemId: string){
    this.cartService.updateSelection(itemId);
  }
  proceedToCheckout(){
    const books = this.cartService.cartToCheckout();
    if(books){
      const passedData : NavigationExtras = {
        state: books
      };
      this.router.navigate(['/shipping'], passedData)
    }
  }
  getItemStyles(item :BookCart){
    return {
      'border-left': item.selected ? '3px solid #CF563D' : 'none',
      // Add more styles as needed...
    };
  }
  clearCart(): void {
    this.cartService.clearCart();
  }
  noneSelected() : boolean{
    const selectedBook = this.cartItems.find(book => book.selected === true)
    if(!selectedBook){
      return true;
    }else{
      return false;
    }
  }
}