import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { BookFetchingService } from '@app/_services';

@Injectable({ providedIn: 'root' })
class BooksService{
    //Making sure the book fetching service is being initialized in places
    // where it's not usefull to inject dependency on the component
    //, but is necessary to load them.
    constructor(
        private router: Router,
        private bookService: BookFetchingService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if(!localStorage.getItem('cart')){
            this.bookService.getAllBooks();
        }
        return of(true);
    }
}
export const BooksGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    return inject(BooksService).canActivate(next, state);
}