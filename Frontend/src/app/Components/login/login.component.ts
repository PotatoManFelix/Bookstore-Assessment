import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../layout/layout.component.css']
})
export class LoginComponent{
  submitted : Boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  loading = false;
  error = '';
  successMessage : string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/'])
    }
  }
  get f() { return this.loginForm.controls; }

  login(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.error = '';
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
          next: () => {
            this.successMessage = 'Logged in successfully, redirecting you';
            setTimeout(() => {
              this.successMessage = '';
              // get return url from route parameters or default to '/'
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigate([returnUrl]);
            }, 2000);
          },
          error: error => {
            if (error && error.error && error.error.message) {
              this.error = error.error.message;
          } else {
              this.error = 'An error occurred during login.';
          }
          }
      });
  }
}