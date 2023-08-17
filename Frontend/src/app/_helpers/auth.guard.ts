import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
class PermissionsService{
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.user.pipe(
            map(user => {
              if (user === null) {
                this.router.navigate(['/login']); // Use parentheses instead of square brackets
                return false; // Return false to prevent navigation
              }
              return true; // Return true to allow navigation
            })
          );
    }
}
export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    return inject(PermissionsService).canActivate(next, state);
  }