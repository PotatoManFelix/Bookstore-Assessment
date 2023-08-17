import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/_services';
@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent{
  constructor(private authService : AuthenticationService){
  }
  logout(){
    this.authService.logout();
  }

}
