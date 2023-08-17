import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName: string = 'John'; // Replace with the user's name
  cartItemsCount: number = 5; // Replace with the actual cart item count
  orders: string[] = ['Order #123', 'Order #456', 'Order #789']; // Replace with actual order data
  ngOnInit(){
    
  }

}
