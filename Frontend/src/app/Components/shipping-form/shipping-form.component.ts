import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/_services';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';
@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent {
  shippingForm = new FormGroup({
    addressLine1: new FormControl(null, [Validators.required]),
    addressLine2: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    telephone: new FormControl(null, [Validators.required, Validators.pattern(/^(?:\+961)?\d{8}$/)])
  });
  showMessage : boolean = false;
  apiResponseMessage : string = '';
  constructor(
    private cart : ShoppingCartService,
    private router : Router,
    private http: HttpClient,
    ){}
  get f() { return this.shippingForm.controls; }
  confirmOrder() {
    const data = JSON.stringify(history.state);
    const userDataString = localStorage.getItem('user');
    const user = JSON.stringify(userDataString);
    const shipping = JSON.stringify([this.f.addressLine1,this.f.addressLine2,this.f.city,this.f.telephone]);
    this.http.post<any>(
      `${environment.apiUrl}/order`,
      { user, data, shipping },
      { withCredentials: true }
    ).subscribe(
      response => {
        this.apiResponseMessage = response.message;
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }
    );
  }
  discardOrder(){
    this.cart.clearCart();
    this.apiResponseMessage = 'Order Discarded Successfully';
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.router.navigate(['/home']);
    }, 2000);
  }
}
