import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component'; 
import { LayoutComponent } from './Components/layout/layout.component';
import { HomeComponent } from './Components/home/home.component'; 
import { RegisterComponent } from './Components/register/register.component'; 
import { AuthGuard } from './_helpers';
import { BookDetailsComponent } from './Components/book-details/book-details.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { LogoutButtonComponent } from './Components/_logout-button/logout-button.component';
import { BooksGuard } from './_helpers/books.guard';
import { UserComponent } from './Components/user/user.component';
import { ShippingFormComponent } from './Components/shipping-form/shipping-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to HomeComponent

  // Login and Register routes using the primary outlet
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, outlet: 'primary' },
      { path: 'register', component: RegisterComponent, outlet: 'primary' },
    ]
  },

  // Home and Book Details routes using the default outlet
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'book/:id', component: BookDetailsComponent, canActivate: [AuthGuard,BooksGuard]},
      { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
      { path: 'logout', component: LogoutButtonComponent},
      { path: 'user', component: UserComponent, canActivate: [AuthGuard]},
      { path: 'shipping', component:ShippingFormComponent, canActivate: [AuthGuard]}
    ]
  },

  // Redirect other unknown paths to the home page
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
