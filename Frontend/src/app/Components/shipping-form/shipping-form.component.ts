import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShoppingCartService } from '@app/_services';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
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
      const { navigationId, ...cart } = history.state;
    const userDataObject = localStorage.getItem('user');
    const shipping = ({
      'addressLine1': this.f.addressLine1.value,
      'addressLine2': this.f.addressLine2.value,
      'city': this.f.city.value,
      'telephone': this.f.telephone.value
    });
    if(userDataObject){
      const user = JSON.parse(userDataObject);
      this.http.post<any>(
        `${environment.apiUrl}/order`,
        { user, cart, shipping },
        { withCredentials: true }
      ).subscribe(
        response => {
          this.apiResponseMessage = response.message;
          localStorage.setItem('cart',response.cart)
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
            this.cart.updateLocalStorage();
            this.router.navigate(['/cart'])
          }, 2000);
        }
      );
    }else{
      console.log("User missing from local storage")
    }
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
