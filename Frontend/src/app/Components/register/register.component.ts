import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../layout/layout.component.css']
})
export class RegisterComponent {
  submitted: Boolean = false;
  registerForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  error: string | null = null;
  loading = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  get f() { return this.registerForm.controls; }
    //TODO: ADAPT
  register() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.register(this.f.username.value, this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
          next: () => {
              // get return url from route parameters or default to '/'
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigate([returnUrl]);
          },
          error: error => {
            if (error && error.error && error.error.message) {
              this.error = error.error.message;
          } else {
              this.error = 'An error occurred during registration.';
          }
          }
      });
  }
}
