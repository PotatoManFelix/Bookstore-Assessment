import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/_services';
import { AuthenticationService } from '@app/_services';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName: string = '';
  constructor(
    protected cart : ShoppingCartService,
    private authService : AuthenticationService,
    private router: Router
    ){

  }
  ngOnInit() {
    this.retrieveUserData();
  }

  private retrieveUserData() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userName = user.username; // Update the username
    }
  }

  logout(){
    this.authService.logout();
  }

}
