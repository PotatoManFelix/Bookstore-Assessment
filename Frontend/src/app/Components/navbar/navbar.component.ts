import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from '@app/_services';
import { User } from '@app/_models';
import { ShoppingCartService } from '@app/_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit{
  user : User | null;
  cartItemCount : number;
  constructor(
    private authenticationService: AuthenticationService,
    protected cart: ShoppingCartService,
  ){
    this.user=null;
    authenticationService.user.subscribe( user => { 
      this.user = user;
    });
    this.cartItemCount = 0;
  }
  ngOnInit(){
    this.cart.cartItems$.subscribe( books => {
      if(books){
        this.cartItemCount = books.length;
      }
    })
  }
  login(){
    console.log('stupid')
  }
  logout(){
    this.authenticationService.logout();
  }
  isLoggedIn():boolean{
    return (this.user!==null);
  }
  getUsernameFirstLetter():string{
    if(this.user && this.user.username){
      return this.user.username[0]
    }else{
      return 'u';
    }
  }
}