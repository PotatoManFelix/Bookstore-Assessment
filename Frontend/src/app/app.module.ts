import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule} from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { NavBarComponent } from './Components/navbar/navbar.component';
import { LayoutHeaderComponent } from './Components/_layout-header/layout-header.component';
import { HomeComponent } from './Components/home/home.component';
import { SearchComponent } from './Components/search/search.component';
import { BookDisplayComponent } from './Components/book-display/book-display.component';
import { BookDetailsComponent } from './Components/book-details/book-details.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { UserComponent } from './Components/user/user.component';
import { ShippingFormComponent } from './Components/shipping-form/shipping-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    LayoutHeaderComponent,
    HomeComponent,
    SearchComponent,
    BookDisplayComponent,
    BookDetailsComponent,
    ShoppingCartComponent,
    UserComponent,
    ShippingFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Angular Forms Imports
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // Angular Material Imports
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
